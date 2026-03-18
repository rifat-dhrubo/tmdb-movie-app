import { MovieGrid, PosterSkeleton } from '@/components/movie';

export function SearchLoading() {
	return (
		<div className="mt-8">
			<MovieGrid columns="search">
				<PosterSkeleton count={6} />
			</MovieGrid>
		</div>
	);
}
