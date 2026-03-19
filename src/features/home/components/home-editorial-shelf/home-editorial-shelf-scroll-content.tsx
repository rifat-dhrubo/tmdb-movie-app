import { motion } from 'motion/react';
import type { Variants } from 'motion/react';

import { MovieCard } from '@/components/movie-card';
import type { Shelf } from '@/features/home/constants';

interface HomeEditorialShelfScrollContentProps {
	movies: Shelf['movies'];
	variants: Variants;
}

export function HomeEditorialShelfScrollContent({
	movies,
	variants,
}: HomeEditorialShelfScrollContentProps) {
	return (
		<motion.div
			className="scrollbar-hide -mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 md:mx-0 md:px-0"
			variants={variants}
		>
			{movies.map((movie) => (
				<motion.div key={movie.id} className="snap-start" variants={variants}>
					<MovieCard
						catalogNumber={movie.catalogNumber}
						director={movie.director}
						genres={movie.genres}
						posterPath={movie.posterPath}
						rating={movie.rating}
						size="lg"
						title={movie.title}
						year={movie.year}
						onAddToWatchlist={() => {
							console.log('Add to watchlist:', movie.id);
						}}
						onTitleClick={() => {
							window.location.href = `/movie/${movie.id}`;
						}}
					/>
				</motion.div>
			))}
		</motion.div>
	);
}
