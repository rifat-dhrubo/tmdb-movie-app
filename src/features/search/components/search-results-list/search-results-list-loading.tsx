import { MovieGrid } from '@/components/movie';
import { MovieCardSkeleton } from '@/components/movie-card';
import { Skeleton } from '@/components/ui/skeleton';

export function SearchResultsListLoading() {
	return (
		<>
			<div className="mx-auto mt-6 max-w-7xl">
				<Skeleton className="h-5 w-48" />
			</div>

			<div className="mx-auto mt-4 max-w-7xl">
				<MovieGrid columns="search">
					{Array.from({ length: 12 }).map((_, index) => (
						<MovieCardSkeleton key={index} size="md" />
					))}
				</MovieGrid>
			</div>
		</>
	);
}
