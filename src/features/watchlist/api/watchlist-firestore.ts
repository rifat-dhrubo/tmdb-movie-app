import {
	Timestamp,
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	onSnapshot,
	orderBy,
	query,
	setDoc,
} from 'firebase/firestore';
import type { QuerySnapshot, Unsubscribe } from 'firebase/firestore';

import type {
	WatchlistGenre,
	WatchlistItem,
	WatchlistPerson,
} from '../types/watchlist-types';

import { movieCredits, movieDetails } from '@/generated/tmdb/default/default';
import type {
	MovieCredits200,
	MovieDetails200,
} from '@/generated/tmdb/tmdbApi.schemas';
import { db } from '@/lib/firebase/config';

interface WatchlistDoc {
	tmdbId?: number;
	mediaType?: 'movie';
	title?: string;
	originalTitle?: string | null;
	overview?: string | null;
	posterPath?: string | null;
	backdropPath?: string | null;
	voteAverage?: number | null;
	voteCount?: number | null;
	releaseDate?: string | null;
	releaseYear?: number | null;
	runtimeMinutes?: number | null;
	genres?: Array<WatchlistGenre>;
	genreIds?: Array<number>;
	directors?: Array<WatchlistPerson>;
	displayDirector?: string | null;
	addedAt?: Timestamp;
	updatedAt?: Timestamp;
}

function getWatchlistCollection(uid: string) {
	return collection(db, 'users', uid, 'watchlist');
}

function getWatchlistDocRef(uid: string, tmdbId: number) {
	return doc(getWatchlistCollection(uid), String(tmdbId));
}

function getWatchlistCollectionQuery(uid: string) {
	return query(getWatchlistCollection(uid), orderBy('addedAt', 'desc'));
}

function mapWatchlistDoc(
	data: WatchlistDoc,
	fallbackTmdbId: number,
): WatchlistItem {
	return {
		tmdbId: data.tmdbId ?? fallbackTmdbId,
		mediaType: 'movie',
		title: data.title ?? 'Unknown title',
		originalTitle: data.originalTitle ?? null,
		overview: data.overview ?? null,
		posterPath: data.posterPath ?? null,
		backdropPath: data.backdropPath ?? null,
		voteAverage: data.voteAverage ?? null,
		voteCount: data.voteCount ?? null,
		releaseDate: data.releaseDate ?? null,
		releaseYear: data.releaseYear ?? null,
		runtimeMinutes: data.runtimeMinutes ?? null,
		genres: data.genres ?? [],
		genreIds: data.genreIds ?? [],
		directors: data.directors ?? [],
		displayDirector: data.displayDirector ?? null,
		addedAt: data.addedAt ?? Timestamp.now(),
		updatedAt: data.updatedAt ?? Timestamp.now(),
	};
}

function mapWatchlistSnapshot(snapshot: QuerySnapshot) {
	return snapshot.docs.map((snapshotDoc) => {
		const tmdbId = Number(snapshotDoc.id);
		return mapWatchlistDoc(snapshotDoc.data() as WatchlistDoc, tmdbId);
	});
}

function normalizeGenres(movie: MovieDetails200) {
	return (
		movie.genres
			?.filter((genre) => genre.name)
			.map((genre) => ({
				id: genre.id ?? 0,
				name: genre.name ?? 'Unknown',
			})) ?? []
	);
}

function normalizeDirectors(credits: MovieCredits200) {
	const uniqueDirectors = new Map<number, WatchlistPerson>();

	for (const member of credits.crew ?? []) {
		if (member.job !== 'Director' || !member.name) {
			continue;
		}

		const key = member.id ?? uniqueDirectors.size + 1;
		if (!uniqueDirectors.has(key)) {
			uniqueDirectors.set(key, {
				id: member.id ?? key,
				name: member.name,
			});
		}
	}

	return [...uniqueDirectors.values()];
}

export function buildWatchlistItem(
	movie: MovieDetails200,
	credits: MovieCredits200,
	addedAt = Timestamp.now(),
) {
	const genres = normalizeGenres(movie);
	const directors = normalizeDirectors(credits);
	const releaseYear = movie.release_date
		? new Date(movie.release_date).getFullYear()
		: null;

	return {
		tmdbId: movie.id ?? 0,
		mediaType: 'movie' as const,
		title: movie.title ?? 'Unknown title',
		originalTitle: movie.original_title ?? null,
		overview: movie.overview ?? null,
		posterPath: movie.poster_path ?? null,
		backdropPath: movie.backdrop_path ?? null,
		voteAverage: movie.vote_average ?? null,
		voteCount: movie.vote_count ?? null,
		releaseDate: movie.release_date ?? null,
		releaseYear,
		runtimeMinutes: movie.runtime ?? null,
		genres,
		genreIds: genres.map((genre) => genre.id),
		directors,
		displayDirector: directors[0]?.name ?? null,
		addedAt,
		updatedAt: Timestamp.now(),
	};
}

export async function getWatchlistItems(uid: string) {
	const snapshot = await getDocs(getWatchlistCollectionQuery(uid));
	return mapWatchlistSnapshot(snapshot);
}

export function subscribeToWatchlist(
	uid: string,
	onItems: (items: Array<WatchlistItem>) => void,
	onError?: (error: Error) => void,
): Unsubscribe {
	return onSnapshot(
		getWatchlistCollectionQuery(uid),
		(snapshot) => {
			onItems(mapWatchlistSnapshot(snapshot));
		},
		(error) => {
			onError?.(error);
		},
	);
}

export async function addWatchlistItem(uid: string, movieId: number) {
	const watchlistDocRef = getWatchlistDocRef(uid, movieId);
	const existingSnapshot = await getDoc(watchlistDocRef);

	if (existingSnapshot.exists()) {
		return mapWatchlistDoc(existingSnapshot.data() as WatchlistDoc, movieId);
	}

	const [movie, credits] = await Promise.all([
		movieDetails(movieId),
		movieCredits(movieId),
	]);
	const item = buildWatchlistItem(movie, credits);

	await setDoc(watchlistDocRef, item);

	return item;
}

export async function removeWatchlistItem(uid: string, movieId: number) {
	await deleteDoc(getWatchlistDocRef(uid, movieId));
	return movieId;
}
