import type { Timestamp } from 'firebase/firestore';

export interface WatchlistGenre {
	id: number;
	name: string;
}

export interface WatchlistPerson {
	id: number;
	name: string;
}

export interface WatchlistItem {
	tmdbId: number;
	mediaType: 'movie';
	title: string;
	originalTitle?: string | null;
	overview?: string | null;
	posterPath?: string | null;
	backdropPath?: string | null;
	voteAverage?: number | null;
	voteCount?: number | null;
	releaseDate?: string | null;
	releaseYear?: number | null;
	runtimeMinutes?: number | null;
	genres: Array<WatchlistGenre>;
	genreIds: Array<number>;
	directors: Array<WatchlistPerson>;
	displayDirector?: string | null;
	addedAt: Timestamp;
	updatedAt: Timestamp;
}

export type WatchlistSortBy = 'added' | 'rating' | 'year';

export type WatchlistDirection = 'asc' | 'desc';

export type WatchlistViewMode = 'grid' | 'list';

export interface WatchlistGenreStat {
	id: number | null;
	name: string;
	count: number;
}

export interface WatchlistDecadeStat {
	decade: number;
	count: number;
}

export interface WatchlistStats {
	moviesSaved: number;
	totalRuntimeMinutes: number;
	topGenres: Array<WatchlistGenreStat>;
	topDecades: Array<WatchlistDecadeStat>;
}
