import { motion } from 'motion/react';

import { HomeEditorialShelfScrollContent } from './home-editorial-shelf-scroll-content';
import { HomeEditorialShelfTextContent } from './home-editorial-shelf-text-content';

import type { Shelf } from '@/features/home/constants';
import {
	homeVariants,
	useReducedMotionInitial,
} from '@/features/home/lib/motion';
import { cn } from '@/lib/utils';

const {
	container: containerVariants,
	item: itemVariants,
	text: textVariants,
} = homeVariants.section;

interface HomeEditorialShelfProps {
	isTogglingMovie: (movieId: number) => boolean;
	shelf: Shelf;
	layout: 'text-left' | 'text-right';
	onToggleWatchlist: (movieId: number) => void;
	savedIds: ReadonlySet<number>;
	isLoading?: boolean;
	isError?: boolean;
	seeAllHref: string;
}

export function HomeEditorialShelf({
	isError,
	isLoading,
	isTogglingMovie,
	layout,
	onToggleWatchlist,
	savedIds,
	seeAllHref,
	shelf,
}: HomeEditorialShelfProps) {
	const initial = useReducedMotionInitial();
	const isTextLeft = layout === 'text-left';

	return (
		<motion.div
			className="py-8 md:py-12"
			initial={initial}
			variants={containerVariants}
			viewport={{ amount: 0.2, once: false }}
			whileInView="visible"
		>
			<div className="flex flex-col gap-6 md:hidden">
				<HomeEditorialShelfTextContent
					badge={shelf.badge}
					seeAllHref={seeAllHref}
					subtitle={shelf.subtitle}
					title={shelf.title}
					variants={textVariants}
				/>
				<HomeEditorialShelfScrollContent
					isError={isError}
					isLoading={isLoading}
					isTogglingMovie={isTogglingMovie}
					movies={shelf.movies}
					savedIds={savedIds}
					variants={itemVariants}
					onToggleWatchlist={onToggleWatchlist}
				/>
			</div>

			<div
				className={cn(
					'hidden gap-8 md:grid lg:gap-12',
					isTextLeft ? 'md:grid-cols-[320px_1fr]' : 'md:grid-cols-[1fr_320px]',
				)}
			>
				{isTextLeft ? (
					<>
						<HomeEditorialShelfTextContent
							badge={shelf.badge}
							seeAllHref={seeAllHref}
							subtitle={shelf.subtitle}
							title={shelf.title}
							variants={textVariants}
						/>
						<HomeEditorialShelfScrollContent
							isError={isError}
							isLoading={isLoading}
							isTogglingMovie={isTogglingMovie}
							movies={shelf.movies}
							savedIds={savedIds}
							variants={itemVariants}
							onToggleWatchlist={onToggleWatchlist}
						/>
					</>
				) : (
					<>
						<HomeEditorialShelfScrollContent
							isError={isError}
							isLoading={isLoading}
							isTogglingMovie={isTogglingMovie}
							movies={shelf.movies}
							savedIds={savedIds}
							variants={itemVariants}
							onToggleWatchlist={onToggleWatchlist}
						/>
						<HomeEditorialShelfTextContent
							badge={shelf.badge}
							seeAllHref={seeAllHref}
							subtitle={shelf.subtitle}
							title={shelf.title}
							variants={textVariants}
						/>
					</>
				)}
			</div>
		</motion.div>
	);
}
