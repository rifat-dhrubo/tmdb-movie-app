import type { InfiniteData } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';

import { SearchEmpty } from './search-empty';
import { SearchError } from './search-error';
import { SearchInput } from './search-input';
import { SearchLoading } from './search-loading';
import { SearchNoResults } from './search-no-results';
import { SearchResultsList } from './search-results-list';
import { YearFilterPopover } from './year-filter-popover';

import type { SearchMovie200 } from '@/generated/tmdb/tmdbApi.schemas';

interface SearchResultsProps {
	committedQuery: string;
	query: string;
	onQueryChange: (value: string) => void;
	onSubmit: (query: string) => void;
	year: string | undefined;
	onYearChange: (year: string | undefined) => void;
	data: InfiniteData<SearchMovie200> | undefined;
	isLoading: boolean;
	isError: boolean;
	isFetchingNextPage: boolean;
	hasNextPage: boolean;
	onLoadMore: () => void;
	onRetry: () => void;
	onToggleSave: (id: number) => void;
	genreMap: Map<number, string>;
	isTogglingMovie: (id: number) => boolean;
	savedIds: ReadonlySet<number>;
}

export function SearchResults({
	committedQuery,
	data,
	genreMap,
	hasNextPage,
	isError,
	isFetchingNextPage,
	isLoading,
	isTogglingMovie,
	onLoadMore,
	onQueryChange,
	onRetry,
	onSubmit,
	onToggleSave,
	onYearChange,
	query,
	savedIds,
	year,
}: SearchResultsProps) {
	const allResults = data?.pages.flatMap((page) => page.results ?? []) ?? [];
	const hasQuery = committedQuery.trim().length > 0;

	return (
		<div className="container mx-auto px-4 py-6">
			<div className="mx-auto max-w-2xl">
				<SearchInput
					value={query}
					onChange={onQueryChange}
					onSubmit={onSubmit}
				/>
			</div>

			{!hasQuery ? <SearchEmpty /> : null}
			{hasQuery && isLoading ? <SearchLoading /> : null}
			{hasQuery && !isLoading && isError ? (
				<SearchError onRetry={onRetry} />
			) : null}
			{hasQuery && !isLoading && !isError ? (
				<>
					<div className="mx-auto mt-4 flex max-w-2xl flex-wrap items-center justify-between gap-2">
						<div className="flex flex-wrap items-center gap-2">
							<YearFilterPopover value={year} onChange={onYearChange} />
						</div>
						<Link
							className="text-sm text-muted-foreground transition-colors hover:text-foreground"
							to="/discover"
						>
							Want to filter by genre? Try Discover →
						</Link>
					</div>

					{allResults.length === 0 ? (
						<SearchNoResults query={committedQuery} />
					) : (
						<SearchResultsList
							committedQuery={committedQuery}
							data={data}
							genreMap={genreMap}
							hasNextPage={hasNextPage}
							isError={isError}
							isFetchingNextPage={isFetchingNextPage}
							isTogglingMovie={isTogglingMovie}
							savedIds={savedIds}
							onLoadMore={onLoadMore}
							onRetry={onRetry}
							onToggleSave={onToggleSave}
						/>
					)}
				</>
			) : null}
		</div>
	);
}
