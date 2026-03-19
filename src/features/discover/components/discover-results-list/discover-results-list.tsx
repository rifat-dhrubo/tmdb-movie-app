import { useSearch } from '@tanstack/react-router';
import React from 'react';
import { useInView } from 'react-intersection-observer';

import { DiscoverResultsListError } from './discover-results-list-error';
import { DiscoverResultsListLoading } from './discover-results-list-loading';
import { DiscoverResultsListNoResults } from './discover-results-list-no-results';

import { Icon } from '@/components/icon';
import { MovieGrid } from '@/components/movie';
import { MovieCard } from '@/components/movie-card';
import { Button } from '@/components/ui/button';
import { getDiscoverSortBy } from '@/features/discover/constants';
import { useDiscoverMovies } from '@/features/discover/hooks/use-discover-movies';
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

export function DiscoverResultsList() {
	const { genres, sort, year } = useSearch({ from: '/_app/discover' });
	const { savedIds } = useWatchlistSavedIds();
	const { isPending, toggle } = useToggleWatchlistItemMutation();
	const { data: genresData } = useGenreMovieList();
	const genreMap = React.useMemo(() => {
		const map = new Map<number, string>();
		if (!genresData?.genres) return map;
		for (const genre of genresData.genres) {
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
	} = useDiscoverMovies({
		genres,
		sortBy: getDiscoverSortBy(sort),
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
	const showInitialError = isError && !data;
	const showEmptyState =
		!isLoading && !showInitialError && allResults.length === 0;
	const showResults = !isLoading && !showInitialError && allResults.length > 0;
	const showPaginationError = showResults && isError;
	const showLoadMoreSentinel = showResults && hasNextPage && !isError;

	function handleRetry() {
		void refetch();
	}

	return (
		<>
			{isLoading ? <DiscoverResultsListLoading /> : null}
			{showInitialError ? (
				<DiscoverResultsListError onRetry={handleRetry} />
			) : null}
			{showEmptyState ? <DiscoverResultsListNoResults /> : null}
			{showResults ? (
				<>
					<div className="mx-auto mt-6 max-w-7xl">
						<p className="text-sm text-muted-foreground">
							{totalResults.toLocaleString()} films found
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
