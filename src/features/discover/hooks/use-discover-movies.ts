import { useInfiniteQuery } from '@tanstack/react-query';

import {
	discoverMovie,
	getDiscoverMovieQueryKey,
} from '@/generated/tmdb/default/default';
import type {
	DiscoverMovieParams,
	DiscoverMovieSortBy,
} from '@/generated/tmdb/tmdbApi.schemas';

interface UseDiscoverMoviesOptions {
	enabled?: boolean;
	genres?: string;
	year?: string;
	sortBy?: DiscoverMovieSortBy;
	minRating?: number;
}

export function useDiscoverMovies({
	enabled = true,
	genres,
	minRating,
	sortBy = 'popularity.desc',
	year,
}: UseDiscoverMoviesOptions) {
	return useInfiniteQuery({
		queryKey: [
			...getDiscoverMovieQueryKey(),
			{ genres, year, sortBy, minRating },
		],
		queryFn: async ({ pageParam = 1 }) => {
			const params: DiscoverMovieParams = {
				page: pageParam,
				sort_by: sortBy,
			};

			if (genres) {
				params.with_genres = genres;
			}

			if (year) {
				params.primary_release_year = Number.parseInt(year, 10);
			}

			if (minRating) {
				params['vote_average.gte'] = minRating;
			}

			const response = await discoverMovie(params);
			return response;
		},
		getNextPageParam: (lastPage) => {
			const currentPage = lastPage.page ?? 1;
			const totalPages = lastPage.total_pages ?? 1;
			return currentPage < totalPages ? currentPage + 1 : undefined;
		},
		initialPageParam: 1,
		enabled,
	});
}
