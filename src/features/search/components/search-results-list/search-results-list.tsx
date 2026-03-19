import { useSearch } from '@tanstack/react-router';
import React from 'react';
import { useInView } from 'react-intersection-observer';

import { SearchEmpty } from '../search-empty';

import { SearchResultsListError } from './search-results-list-error';
import { SearchResultsListLoading } from './search-results-list-loading';
import { SearchResultsListNoResults } from './search-results-list-no-results';

import { Icon } from '@/components/icon';
import { MovieGrid } from '@/components/movie';
import { MovieCard } from '@/components/movie-card';
import { Button } from '@/components/ui/button';
import { useSearchMovies } from '@/features/search/hooks/use-search-movies';
import {
	useToggleWatchlistItemMutation,
	useWatchlistSavedIds,
} from '@/features/watchlist';
import { useGenreMovieList } from '@/generated/tmdb/default/default';

function getGenresFromIds(
	genreIds: Array<number> | undefined,
	genreMap: Map<number, string>,
): Array<string> {
	if (!genreIds) return [];

	return genreIds
		.map((id) => genreMap.get(id))
		.filter((name): name is string => name !== undefined);
}

export function SearchResultsList() {
	const { q: queryParam, year } = useSearch({ from: '/_app/search' });
	const committedQuery = queryParam?.trim() ?? '';
	const hasQuery = committedQuery.length > 0;
	const { savedIds } = useWatchlistSavedIds();
	const { isPending, toggle } = useToggleWatchlistItemMutation();
	const { data: genresData } = useGenreMovieList();
	const genreMap = React.useMemo(() => {
		const map = new Map<number, string>();

		for (const genre of genresData?.genres ?? []) {
			if (genre.id !== undefined && genre.name) {
				map.set(genre.id, genre.name);
			}
		}

		return map;
	}, [genresData]);
	const {
		data,
		fetchNextPage,
		hasNextPage,
		isError,
		isFetchingNextPage,
		isLoading,
		refetch,
	} = useSearchMovies({
		query: committedQuery,
		year,
	});
	const { inView, ref: sentinelRef } = useInView({
		rootMargin: '200px',
		threshold: 0,
	});

	React.useEffect(() => {
		if (inView && hasNextPage && !isFetchingNextPage && !isError) {
			void fetchNextPage();
		}
	}, [fetchNextPage, hasNextPage, inView, isError, isFetchingNextPage]);

	const allResults = data?.pages.flatMap((page) => page.results ?? []) ?? [];
	const totalResults = data?.pages[0]?.total_results ?? 0;
	const showInitialError = hasQuery && isError && !data;
	const showEmptyState =
		hasQuery && !isLoading && !showInitialError && allResults.length === 0;
	const showResults =
		hasQuery && !isLoading && !showInitialError && allResults.length > 0;
	const showPaginationError = showResults && isError;
	const showLoadMoreSentinel = showResults && hasNextPage && !isError;

	function handleRetry() {
		void refetch();
	}

	return (
		<>
			{!hasQuery ? <SearchEmpty /> : null}
			{hasQuery && isLoading ? <SearchResultsListLoading /> : null}
			{showInitialError ? (
				<SearchResultsListError onRetry={handleRetry} />
			) : null}
			{showEmptyState ? (
				<SearchResultsListNoResults query={committedQuery} />
			) : null}
			{showResults ? (
				<>
					<div className="mx-auto mt-6 max-w-7xl">
						<p className="text-sm text-muted-foreground">
							{totalResults.toLocaleString()} results for &ldquo;
							{committedQuery}&rdquo;
						</p>
					</div>

					<div className="mx-auto mt-4 max-w-7xl">
						<MovieGrid columns="search">
							{allResults.map((movie) => {
								const movieId = movie.id ?? 0;
								const movieYear = movie.release_date
									? new Date(movie.release_date).getFullYear()
									: 0;

								return (
									<MovieCard
										key={movie.id}
										genres={getGenresFromIds(movie.genre_ids, genreMap)}
										id={movieId}
										isPending={isPending(movieId)}
										isSaved={savedIds.has(movieId)}
										posterPath={movie.poster_path ?? null}
										rating={movie.vote_average ?? 0}
										title={movie.title ?? 'Unknown'}
										year={movieYear}
										onToggleWatchlist={() => {
											void toggle(movieId);
										}}
									/>
								);
							})}
						</MovieGrid>

						{isFetchingNextPage ? (
							<div className="mt-8 flex justify-center">
								<Icon
									className="size-6 animate-spin text-muted-foreground"
									name="spinner_bold"
								/>
							</div>
						) : null}

						{showPaginationError ? (
							<div className="mt-8 flex flex-col items-center gap-2">
								<p className="text-sm text-muted-foreground">
									Failed to load more results
								</p>
								<Button
									size="sm"
									type="button"
									variant="outline"
									onClick={handleRetry}
								>
									Retry
								</Button>
							</div>
						) : null}

						{showLoadMoreSentinel ? (
							<div ref={sentinelRef} aria-hidden="true" className="h-4" />
						) : null}
					</div>
				</>
			) : null}
		</>
	);
}
