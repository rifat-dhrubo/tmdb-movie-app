import type { ShelfMovie } from '../constants';

import type {
	GenreMovieList200,
	MoviePopularList200ResultsItem,
	TrendingMovies200ResultsItem,
} from '@/generated/tmdb/tmdbApi.schemas';

export function extractYearFromDate(date: string | undefined): number {
	if (!date) return 0;
	const year = new Date(date).getFullYear();
	return Number.isNaN(year) ? 0 : year;
}

export function createGenreMap(
	genres: GenreMovieList200['genres'],
): Map<number, string> {
	const map = new Map<number, string>();
	if (!genres) return map;
	for (const genre of genres) {
		if (genre.id !== undefined && genre.name) {
			map.set(genre.id, genre.name);
		}
	}
	return map;
}

export function getGenresFromIds(
	genreIds: Array<number> | undefined,
	genreMap: Map<number, string>,
): Array<string> {
	if (!genreIds) return [];
	return genreIds
		.map((id) => genreMap.get(id))
		.filter((name): name is string => name !== undefined);
}

export function mapTmdbMovieToShelfMovie(
	movie: TrendingMovies200ResultsItem | MoviePopularList200ResultsItem,
	index: number,
	genreMap: Map<number, string>,
): ShelfMovie {
	return {
		id: movie.id ?? 0,
		title: movie.title ?? 'Unknown',
		year: extractYearFromDate(movie.release_date),
		posterPath: movie.poster_path ?? '',
		rating: movie.vote_average ?? 0,
		genres: getGenresFromIds(movie.genre_ids, genreMap),
		catalogNumber: String(index + 1).padStart(3, '0'),
	};
}
