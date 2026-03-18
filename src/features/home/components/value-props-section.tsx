import { motion, useReducedMotion } from 'motion/react';
import type { Variants } from 'motion/react';

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

export function ValuePropsSection() {
	const shouldReduceMotion = useReducedMotion();

	return (
		<motion.div
			className="grid gap-12 md:grid-cols-[1fr_auto_1fr] md:gap-16"
			initial={shouldReduceMotion ? 'visible' : 'hidden'}
			variants={containerVariants}
			viewport={{ amount: 0.2, once: true }}
			whileInView="visible"
		>
			<motion.div
				className="flex flex-col justify-center"
				variants={itemVariants}
			>
				<h2 className="font-serif text-4xl tracking-tight md:text-5xl">
					Your watchlist,{' '}
					<em className="text-primary italic">beautifully kept.</em>
				</h2>
				<p className="mt-6 max-w-md text-base text-muted-foreground md:text-lg">
					Not an algorithm. Not a recommendation engine. A quiet place to save
					the films that matter to you.
				</p>
			</motion.div>

			<div className="hidden w-px bg-border/40 md:block" />

			<motion.div
				className="flex flex-col justify-center"
				variants={itemVariants}
			>
				<ul className="list-c list-disc space-y-6">
					<li>
						<p className="text-base font-medium">Save any film instantly</p>
						<p className="text-sm text-muted-foreground">
							One tap to add. Your list syncs everywhere, always.
						</p>
					</li>
					<li>
						<p className="text-base font-medium">Search across everything</p>
						<p className="text-sm text-muted-foreground">
							Find any film, director, or year. Add it before you forget.
						</p>
					</li>
					<li>
						<p className="text-base font-medium">Mark what you&apos;ve seen</p>
						<p className="text-sm text-muted-foreground">
							Track watched films. Build a record of your taste over time.
						</p>
					</li>
				</ul>
			</motion.div>
		</motion.div>
	);
}
