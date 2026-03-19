import { createFileRoute } from '@tanstack/react-router';

import { HomeCtaSection } from '@/features/home/components/home-cta-section';
import { HomeEditorialShelf } from '@/features/home/components/home-editorial-shelf';
import { HomeFooter } from '@/features/home/components/home-footer';
import { HomeHero } from '@/features/home/components/home-hero';
import { ValuePropsSection } from '@/features/home/components/value-props-section';
import { usePopularShelf } from '@/features/home/hooks/use-popular-shelf';
import { useTrendingShelf } from '@/features/home/hooks/use-trending-shelf';
import {
	useToggleWatchlistItemMutation,
	useWatchlistSavedIds,
} from '@/features/watchlist';
import {
	getGenreMovieListQueryOptions,
	getMoviePopularListQueryOptions,
	getTrendingMoviesQueryOptions,
} from '@/generated/tmdb/default/default';

export const Route = createFileRoute('/_app/')({
	component: HomePage,
	beforeLoad(ctx) {
		void ctx.context.queryClient.ensureQueryData(
			getTrendingMoviesQueryOptions(undefined, 'week'),
		);
		void ctx.context.queryClient.ensureQueryData(
			getMoviePopularListQueryOptions(),
		);
		void ctx.context.queryClient.ensureQueryData(
			getGenreMovieListQueryOptions(),
		);
	},
});

function HomePage() {
	const {
		isError: isTrendingError,
		isLoading: isTrendingLoading,
		movies: trendingMovies,
	} = useTrendingShelf();

	const {
		isError: isPopularError,
		isLoading: isPopularLoading,
		movies: popularMovies,
	} = usePopularShelf();
	const { savedIds } = useWatchlistSavedIds();
	const { isPending, toggle } = useToggleWatchlistItemMutation();

	const trendingShelf = {
		title: 'Trending',
		subtitle: 'What people are watching right now.',
		movies: trendingMovies,
	};

	const popularShelf = {
		title: 'Popular',
		subtitle: 'The ones people keep coming back to.',
		movies: popularMovies,
	};

	return (
		<>
			<main>
				<HomeHero />

				<section className="border-t py-16 md:py-24">
					<div className="container mx-auto px-4 md:px-6">
						<HomeEditorialShelf
							key={JSON.stringify(trendingShelf)}
							isError={isTrendingError}
							isLoading={isTrendingLoading}
							isTogglingMovie={isPending}
							layout="text-left"
							savedIds={savedIds}
							shelf={trendingShelf}
							onToggleWatchlist={(movieId) => {
								void toggle(movieId);
							}}
						/>
					</div>
				</section>

				<section className="border-t py-16 md:py-24">
					<div className="container mx-auto px-4 md:px-6">
						<HomeEditorialShelf
							key={JSON.stringify(popularShelf)}
							isError={isPopularError}
							isLoading={isPopularLoading}
							isTogglingMovie={isPending}
							layout="text-right"
							savedIds={savedIds}
							shelf={popularShelf}
							onToggleWatchlist={(movieId) => {
								void toggle(movieId);
							}}
						/>
					</div>
				</section>

				<section className="border-t py-16 md:py-24">
					<div className="container mx-auto px-4 md:px-6">
						<ValuePropsSection />
					</div>
				</section>

				<HomeCtaSection />
			</main>

			<HomeFooter />
		</>
	);
}
