import type { ShelfMovie } from '../constants';
import { createGenreMap, mapTmdbMovieToShelfMovie } from '../lib/movie-helpers';

import {
	useGenreMovieList,
	useMoviePopularList,
} from '@/generated/tmdb/default/default';

interface UsePopularShelfResult {
	movies: Array<ShelfMovie>;
	isLoading: boolean;
	isError: boolean;
}

export function usePopularShelf(): UsePopularShelfResult {
	const {
		data: moviesData,
		isError: isMoviesError,
		isLoading: isMoviesLoading,
	} = useMoviePopularList();

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
