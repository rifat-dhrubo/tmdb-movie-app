import { motion, useReducedMotion } from 'motion/react';
import type { Variants } from 'motion/react';

import { HomeEditorialShelfScrollContent } from './home-editorial-shelf-scroll-content';
import { HomeEditorialShelfTextContent } from './home-editorial-shelf-text-content';

import type { Shelf } from '@/features/home/constants';
import { cn } from '@/lib/utils';

interface HomeEditorialShelfProps {
	shelf: Shelf;
	layout: 'text-left' | 'text-right';
}

const containerVariants: Variants = {
	hidden: { opacity: 1 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.08,
			delayChildren: 0.1,
		},
	},
};

const textVariants: Variants = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.5,
			ease: [0.23, 1, 0.32, 1] as [number, number, number, number],
		},
	},
};

const itemVariants: Variants = {
	hidden: { opacity: 0, y: 30 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.5,
			ease: [0.23, 1, 0.32, 1] as [number, number, number, number],
		},
	},
};

export function HomeEditorialShelf({ layout, shelf }: HomeEditorialShelfProps) {
	const shouldReduceMotion = useReducedMotion();
	const isTextLeft = layout === 'text-left';

	return (
		<motion.div
			className="py-8 md:py-12"
			initial={shouldReduceMotion ? 'visible' : 'hidden'}
			variants={containerVariants}
			viewport={{ amount: 0.2, once: true }}
			whileInView="visible"
		>
			{/* Mobile: Text on top, scroll below */}
			<div className="flex flex-col gap-6 md:hidden">
				<HomeEditorialShelfTextContent
					badge={shelf.badge}
					subtitle={shelf.subtitle}
					title={shelf.title}
					variants={textVariants}
				/>
				<HomeEditorialShelfScrollContent
					movies={shelf.movies}
					variants={itemVariants}
				/>
			</div>

			{/* Desktop: Side by side */}
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
							subtitle={shelf.subtitle}
							title={shelf.title}
							variants={textVariants}
						/>
						<HomeEditorialShelfScrollContent
							movies={shelf.movies}
							variants={itemVariants}
						/>
					</>
				) : (
					<>
						<HomeEditorialShelfScrollContent
							movies={shelf.movies}
							variants={itemVariants}
						/>
						<HomeEditorialShelfTextContent
							badge={shelf.badge}
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
