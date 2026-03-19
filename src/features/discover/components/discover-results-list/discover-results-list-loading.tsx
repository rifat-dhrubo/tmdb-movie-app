import { MovieCardSkeleton } from '@/components/movie-card';

export function DiscoverResultsListLoading() {
	return (
		<div className="container mx-auto px-4 py-6">
			<div className="mx-auto max-w-7xl">
				{/* Filter bar skeleton */}
				<div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
					<div className="flex flex-wrap items-center gap-2">
						<div className="h-9 w-28 animate-pulse rounded-md border border-border bg-muted" />
						<div className="h-9 w-24 animate-pulse rounded-md border border-border bg-muted" />
					</div>
					<div className="h-9 w-32 animate-pulse rounded-md border border-border bg-muted" />
				</div>

				{/* Results count skeleton */}
				<div className="mt-6">
					<div className="h-5 w-32 animate-pulse rounded bg-muted" />
				</div>

				{/* Movie grid skeleton */}
				<div className="mt-4">
					<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
						{Array.from({ length: 12 }).map((_, i) => (
							<MovieCardSkeleton key={i} size="md" />
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
