import { motion } from 'motion/react';
import type { Variants } from 'motion/react';

import { MovieCard, MovieCardSkeleton } from '@/components/movie-card';
import type { Shelf } from '@/features/home/constants';

interface HomeEditorialShelfScrollContentProps {
	isTogglingMovie: (movieId: number) => boolean;
	movies: Shelf['movies'];
	onToggleWatchlist: (movieId: number) => void;
	savedIds: ReadonlySet<number>;
	variants: Variants;
	isLoading?: boolean;
	isError?: boolean;
}

function LoadingSkeletons({ variants }: { variants: Variants }) {
	return (
		<>
			{Array.from({ length: 8 }).map((_, index) => (
				<motion.div
					key={`skeleton-${index}`}
					className="snap-start"
					variants={variants}
				>
					<MovieCardSkeleton size="lg" />
				</motion.div>
			))}
		</>
	);
}

function MovieList({
	isTogglingMovie,
	movies,
	onToggleWatchlist,
	savedIds,
	variants,
}: {
	isTogglingMovie: (movieId: number) => boolean;
	movies: Shelf['movies'];
	onToggleWatchlist: (movieId: number) => void;
	savedIds: ReadonlySet<number>;
	variants: Variants;
}) {
	return (
		<>
			{movies.map((movie) => (
				<motion.div key={movie.id} className="snap-start" variants={variants}>
					<MovieCard
						catalogNumber={movie.catalogNumber}
						director={movie.director}
						genres={movie.genres}
						id={movie.id}
						isPending={isTogglingMovie(movie.id)}
						isSaved={savedIds.has(movie.id)}
						posterPath={movie.posterPath}
						rating={movie.rating}
						size="lg"
						title={movie.title}
						year={movie.year}
						onToggleWatchlist={() => onToggleWatchlist(movie.id)}
					/>
				</motion.div>
			))}
		</>
	);
}

export function HomeEditorialShelfScrollContent({
	isError,
	isLoading,
	isTogglingMovie,
	movies,
	onToggleWatchlist,
	savedIds,
	variants,
}: HomeEditorialShelfScrollContentProps) {
	if (isError) {
		return (
			<motion.div
				className="scrollbar-hide -mx-4 flex h-64 items-center justify-center overflow-x-auto px-4 md:mx-0 md:px-0"
				variants={variants}
			>
				<p className="text-center text-muted-foreground">
					Failed to load movies.
					<br />
					Please try again later.
				</p>
			</motion.div>
		);
	}

	return (
		<motion.div
			className="scrollbar-hide -mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 md:mx-0 md:px-0"
			variants={variants}
		>
			{isLoading ? (
				<LoadingSkeletons variants={variants} />
			) : (
				<MovieList
					isTogglingMovie={isTogglingMovie}
					movies={movies}
					savedIds={savedIds}
					variants={variants}
					onToggleWatchlist={onToggleWatchlist}
				/>
			)}
		</motion.div>
	);
}
