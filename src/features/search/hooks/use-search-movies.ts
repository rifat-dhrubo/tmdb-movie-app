import { useInfiniteQuery } from '@tanstack/react-query';

import {
	getSearchMovieQueryKey,
	searchMovie,
} from '@/generated/tmdb/default/default';
import type { SearchMovieParams } from '@/generated/tmdb/tmdbApi.schemas';

interface UseSearchMoviesOptions {
	enabled?: boolean;
	query: string;
	year?: string;
}

export function useSearchMovies({
	enabled = true,
	query,
	year,
}: UseSearchMoviesOptions) {
	return useInfiniteQuery({
		queryKey: [...getSearchMovieQueryKey(), { query, year }],
		queryFn: async ({ pageParam = 1 }) => {
			const params: SearchMovieParams = {
				page: pageParam,
				query,
			};

			if (year) {
				params.primary_release_year = year;
			}

			const response = await searchMovie(params);

			return response;
		},
		getNextPageParam: (lastPage) => {
			const currentPage = lastPage.page ?? 1;
			const totalPages = lastPage.total_pages ?? 1;
			return currentPage < totalPages ? currentPage + 1 : undefined;
		},
		initialPageParam: 1,
		enabled: enabled && query.length > 0,
	});
}
