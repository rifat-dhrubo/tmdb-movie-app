import type { ShelfMovie } from '../constants';
import { createGenreMap, mapTmdbMovieToShelfMovie } from '../lib/movie-helpers';

import {
	useGenreMovieList,
	useTrendingMovies,
} from '@/generated/tmdb/default/default';

interface UseTrendingShelfResult {
	movies: Array<ShelfMovie>;
	isLoading: boolean;
	isError: boolean;
}

export function useTrendingShelf(): UseTrendingShelfResult {
	const {
		data: moviesData,
		isError: isMoviesError,
		isLoading: isMoviesLoading,
	} = useTrendingMovies(undefined, 'week');

	const {
		data: genresData,
		isError: isGenresError,
		isLoading: isGenresLoading,
	} = useGenreMovieList();

	const isLoading = isMoviesLoading || isGenresLoading;
	const isError = isMoviesError || isGenresError;

	const genreMap = createGenreMap(genresData?.genres);

	const movies: Array<ShelfMovie> =
		moviesData?.results?.map((movie, index) =>
			mapTmdbMovieToShelfMovie(movie, index, genreMap),
		) ?? [];

	return {
		movies,
		isLoading,
		isError,
	};
}
