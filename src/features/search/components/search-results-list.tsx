import type { InfiniteData } from '@tanstack/react-query';

import { MovieGrid, PosterCard } from '@/components/movie';
import { Button } from '@/components/ui/button';
import type { SearchMovie200 } from '@/generated/tmdb/tmdbApi.schemas';

interface SearchResultsListProps {
	committedQuery: string;
	data: InfiniteData<SearchMovie200> | undefined;
	hasNextPage: boolean;
	isFetchingNextPage: boolean;
	onLoadMore: () => void;
	onToggleSave: (id: number) => void;
	savedIds: Set<number>;
}

export function SearchResultsList({
	committedQuery,
	data,
	hasNextPage,
	isFetchingNextPage,
	onLoadMore,
	onToggleSave,
	savedIds,
}: SearchResultsListProps) {
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
						<PosterCard
							key={movie.id}
							id={movie.id ?? 0}
							isSaved={savedIds.has(movie.id ?? 0)}
							posterPath={movie.poster_path ?? null}
							rating={movie.vote_average ?? 0}
							title={movie.title ?? 'Unknown'}
							year={
								movie.release_date
									? new Date(movie.release_date).getFullYear()
									: 0
							}
							onToggleSave={onToggleSave}
							onViewDetails={(id) => {
								window.location.href = `/movies/${id}`;
							}}
						/>
					))}
				</MovieGrid>

				{hasNextPage ? (
					<div className="mt-8 flex justify-center">
						<Button
							disabled={isFetchingNextPage}
							type="button"
							variant="outline"
							onClick={onLoadMore}
						>
							{isFetchingNextPage ? 'Loading...' : 'Load more'}
						</Button>
					</div>
				) : null}
			</div>
		</>
	);
}
