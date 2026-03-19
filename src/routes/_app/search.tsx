import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { z } from 'zod';

import { SearchResults } from '@/features/search/components/search-results';
import { useSearchMovies } from '@/features/search/hooks/use-search-movies';
import {
	useToggleWatchlistItemMutation,
	useWatchlistSavedIds,
} from '@/features/watchlist';
import { useDebouncedSearchParam } from '@/hooks/use-debounced-search-param';

const searchSchema = z.object({
	q: z.string().optional(),
	year: z.string().optional(),
});

export const Route = createFileRoute('/_app/search')({
	component: SearchPage,
	validateSearch: searchSchema,
});

function SearchPage() {
	const navigate = useNavigate();
	const params = Route.useSearch();

	const { year } = params;
	const {
		inputValue: query,
		searchValue: committedQuery,
		setValue: setQuery,
	} = useDebouncedSearchParam(Route, 'q');

	const { savedIds } = useWatchlistSavedIds();
	const { toggle } = useToggleWatchlistItemMutation();

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
		enabled: committedQuery.length > 0,
	});

	function submitQuery(value: string) {
		void navigate({
			to: '/search',
			search: { q: value, year },
		});
	}

	function handleSubmit(newQuery: string) {
		const trimmedQuery = newQuery.trim();

		if (!trimmedQuery) {
			return;
		}

		submitQuery(trimmedQuery);
	}

	function handleYearChange(newYear: string | undefined) {
		void navigate({
			to: '/search',
			search: { q: committedQuery || undefined, year: newYear },
		});
	}

	function handleRetry() {
		void refetch();
	}

	return (
		<main className="pb-16">
			<SearchResults
				committedQuery={committedQuery}
				data={data}
				hasNextPage={hasNextPage}
				isError={isError}
				isFetchingNextPage={isFetchingNextPage}
				isLoading={isLoading}
				query={query}
				savedIds={savedIds}
				year={year}
				onLoadMore={() => void fetchNextPage()}
				onQueryChange={setQuery}
				onRetry={handleRetry}
				onSubmit={handleSubmit}
				onYearChange={handleYearChange}
				onToggleSave={(id) => {
					void toggle(id);
				}}
			/>
		</main>
	);
}
