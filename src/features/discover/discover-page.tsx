import { DiscoverFilterBar } from './components/discover-filter-bar';
import { DiscoverResultsList } from './components/discover-results-list';

export function DiscoverPage() {
	return (
		<div className="container mx-auto px-4 py-6">
			<div className="mx-auto max-w-7xl">
				<div className="mb-6">
					<h1 className="font-serif text-3xl tracking-tight md:text-4xl">
						Discover
					</h1>
				</div>
				<DiscoverFilterBar />
			</div>
			<DiscoverResultsList />
		</div>
	);
}
