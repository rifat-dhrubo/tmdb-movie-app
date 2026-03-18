import { motion, useReducedMotion } from 'motion/react';
import type { Variants } from 'motion/react';
import React from 'react';

import {
	CASCADE_FILMS,
	CASCADE_ORIGIN_X,
	CASCADE_POSITIONS,
} from '../constants';

import { CascadePoster } from './home-cascade-poster';
import { HomeSearchForm } from './home-search-form';

import { Badge } from '@/components/ui/badge';

const containerVariants: Variants = {
	hidden: { opacity: 1 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
			delayChildren: 0.1,
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

export function HomeHero() {
	const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);
	const shouldReduceMotion = useReducedMotion();

	return (
		<section className="relative overflow-hidden py-20 md:py-28 lg:py-32">
			<div className="container mx-auto px-4 md:px-6">
				<div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-12">
					<motion.div
						className="flex flex-col justify-center"
						initial={shouldReduceMotion ? 'visible' : 'hidden'}
						variants={containerVariants}
						viewport={{ amount: 0.3, once: true }}
						whileInView="visible"
					>
						<motion.div
							className="mb-6 flex items-center gap-2"
							variants={itemVariants}
						>
							<Badge variant="outline">
								<span className="size-1.5 rounded-full bg-primary" />
								Personal Film Journal
							</Badge>
						</motion.div>

						<motion.h1
							className="font-serif text-5xl font-normal tracking-tight md:text-6xl lg:text-7xl"
							variants={itemVariants}
						>
							Curate your <em className="text-primary">cinema.</em>
						</motion.h1>

						<motion.p
							className="mt-6 max-w-md text-lg text-muted-foreground md:text-xl"
							variants={itemVariants}
						>
							A personal journal for the films that matter
						</motion.p>

						<motion.div className="mt-8 max-w-md" variants={itemVariants}>
							<HomeSearchForm />
						</motion.div>
					</motion.div>

					<div className="relative flex items-center justify-center lg:justify-end">
						<div className="relative w-full max-w-sm md:max-w-xl">
							<div className="relative h-100 w-full overflow-visible md:h-130">
								{CASCADE_FILMS.map((film, index) => (
									<CascadePoster
										key={film.title}
										film={film}
										hoveredIndex={hoveredIndex}
										index={index}
										originX={CASCADE_ORIGIN_X}
										position={CASCADE_POSITIONS[index]}
										onHoverChange={setHoveredIndex}
									/>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
