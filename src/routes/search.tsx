import {
	createFileRoute,
	useNavigate,
	useSearch,
} from '@tanstack/react-router';
import { z } from 'zod';

import { SiteHeader } from '@/components/site';
import { SearchResults } from '@/features/search/components/search-results';
import { useSearchMovies } from '@/features/search/hooks/use-search-movies';
import { useDebouncedSearchParam } from '@/hooks/use-debounced-search-param';
import { useWatchlist } from '@/hooks/use-watchlist';

const searchSchema = z.object({
	q: z.string().optional(),
	year: z.string().optional(),
});

export const Route = createFileRoute('/search')({
	component: SearchPage,
	validateSearch: searchSchema,
});

function SearchPage() {
	const navigate = useNavigate({ from: '/search' });
	const params = useSearch({ from: '/search' });

	const { year } = params;
	const {
		inputValue: query,
		searchValue: committedQuery,
		setValue: setQuery,
	} = useDebouncedSearchParam(Route, 'q');

	const { savedIds, toggleSave } = useWatchlist();

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
		<div className="min-h-screen bg-background">
			<SiteHeader />
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
					onToggleSave={toggleSave}
					onYearChange={handleYearChange}
				/>
			</main>
		</div>
	);
}
