import { motion } from 'motion/react';

import type { Shelf } from '../constants';

import { PosterCard } from './poster-card';

interface EditorialShelfProps {
	shelf: Shelf;
	index?: number;
}

export function EditorialShelf({ index = 0, shelf }: EditorialShelfProps) {
	return (
		<motion.div
			animate={{ opacity: 1, y: 0 }}
			initial={{ opacity: 0, y: 30 }}
			transition={{
				duration: 0.6,
				ease: [0.23, 1, 0.32, 1],
				delay: index * 0.15,
			}}
		>
			<div className="mb-6 md:mb-8">
				<h2 className="font-serif text-2xl tracking-tight md:text-3xl">
					{shelf.title}
				</h2>
				<p className="mt-1 text-sm text-muted-foreground">{shelf.subtitle}</p>
			</div>

			{/* Mobile: Horizontal scroll with snap */}
			<div className="scrollbar-hide -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 md:hidden">
				{shelf.movies.map((movie) => (
					<div key={movie.id} className="snap-start">
						<PosterCard
							id={movie.id}
							posterPath={movie.posterPath}
							size="sm"
							title={movie.title}
							year={movie.year}
						/>
					</div>
				))}
			</div>

			{/* Desktop: Grid */}
			<div className="hidden gap-6 md:grid md:grid-cols-4 lg:grid-cols-6">
				{shelf.movies.map((movie) => (
					<div key={movie.id} className="w-full">
						<PosterCard
							id={movie.id}
							posterPath={movie.posterPath}
							size="md"
							title={movie.title}
							year={movie.year}
						/>
					</div>
				))}
			</div>
		</motion.div>
	);
}
