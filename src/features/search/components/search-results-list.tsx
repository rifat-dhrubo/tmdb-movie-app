import type { InfiniteData } from '@tanstack/react-query';
import React from 'react';
import { useInView } from 'react-intersection-observer';

import { Icon } from '@/components/icon';
import { MovieGrid } from '@/components/movie';
import { MovieCard } from '@/components/movie-card';
import { Button } from '@/components/ui/button';
import type { SearchMovie200 } from '@/generated/tmdb/tmdbApi.schemas';

interface SearchResultsListProps {
	committedQuery: string;
	data: InfiniteData<SearchMovie200> | undefined;
	hasNextPage: boolean;
	isFetchingNextPage: boolean;
	isError: boolean;
	onLoadMore: () => void;
	onToggleSave: (id: number) => void;
	onRetry: () => void;
	genreMap: Map<number, string>;
}

function getGenresFromIds(
	genreIds: Array<number> | undefined,
	genreMap: Map<number, string>,
): Array<string> {
	if (!genreIds) return [];
	return genreIds
		.map((id) => genreMap.get(id))
		.filter((name): name is string => name !== undefined);
}

export function SearchResultsList({
	committedQuery,
	data,
	genreMap,
	hasNextPage,
	isError,
	isFetchingNextPage,
	onLoadMore,
	onRetry,
	onToggleSave,
}: SearchResultsListProps) {
	const { inView, ref: sentinelRef } = useInView({
		rootMargin: '200px',
		threshold: 0,
	});

	React.useEffect(() => {
		if (inView && hasNextPage && !isFetchingNextPage && !isError) {
			onLoadMore();
		}
	}, [inView, hasNextPage, isFetchingNextPage, isError, onLoadMore]);

	const allResults = data?.pages.flatMap((page) => page.results ?? []) ?? [];
	const totalResults = data?.pages[0]?.total_results ?? 0;

	return (
		<>
			<div className="mx-auto mt-6 max-w-7xl">
				<p className="text-sm text-muted-foreground">
					{totalResults.toLocaleString()} results for &ldquo;{committedQuery}
					&rdquo;
				</p>
			</div>

			<div className="mx-auto mt-4 max-w-7xl">
				<MovieGrid columns="search">
					{allResults.map((movie) => (
						<MovieCard
							key={movie.id}
							genres={getGenresFromIds(movie.genre_ids, genreMap)}
							id={movie.id ?? 0}
							posterPath={movie.poster_path ?? null}
							rating={movie.vote_average ?? 0}
							title={movie.title ?? 'Unknown'}
							year={
								movie.release_date
									? new Date(movie.release_date).getFullYear()
									: 0
							}
							onAddToWatchlist={() => onToggleSave(movie.id ?? 0)}
						/>
					))}
				</MovieGrid>

				{isFetchingNextPage ? (
					<div className="mt-8 flex justify-center">
						<Icon
							className="size-6 animate-spin text-muted-foreground"
							name="spinner_bold"
						/>
					</div>
				) : null}

				{isError ? (
					<div className="mt-8 flex flex-col items-center gap-2">
						<p className="text-sm text-muted-foreground">
							Failed to load more results
						</p>
						<Button size="sm" type="button" variant="outline" onClick={onRetry}>
							Retry
						</Button>
					</div>
				) : null}

				{hasNextPage && !isError ? (
					<div ref={sentinelRef} aria-hidden="true" className="h-4" />
				) : null}
			</div>
		</>
	);
}
