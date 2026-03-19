import { SearchInputSection } from './components/search-input-section';
import { SearchResultsList } from './components/search-results-list';

export function SearchPage() {
	return (
		<div className="container mx-auto px-4 py-6">
			<SearchInputSection />
			<SearchResultsList />
		</div>
	);
}
