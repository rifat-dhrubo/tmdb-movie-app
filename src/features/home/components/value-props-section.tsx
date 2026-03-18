import { motion } from 'motion/react';

import { Icon } from '@/components/icon';
import type { IconName } from '@/generated/icons';

const VALUE_PROPS = [
	{
		icon: 'book_bold',
		title: 'Keep a journal',
		description:
			'Log your thoughts, ratings, and memories for every film you watch. Build your personal cinema history.',
	},
	{
		icon: 'bookmark_bold',
		title: 'Build your watchlist',
		description:
			'Discover and save films to watch later. Never forget that recommendation from a friend again.',
	},
	{
		icon: 'pencil_bold',
		title: 'Write notes',
		description:
			'Private reflections on every viewing. Your thoughts, your words, your journey through cinema.',
	},
] satisfies Array<{ description: string; icon: IconName; title: string }>;

export function ValuePropsSection() {
	return (
		<div className="grid gap-10 md:grid-cols-3 md:gap-12">
			{VALUE_PROPS.map((prop, index) => (
				<motion.div
					key={prop.title}
					animate={{ opacity: 1, y: 0 }}
					className="group flex flex-col items-center text-center md:items-start md:text-left"
					initial={{ opacity: 0, y: 20 }}
					transition={{
						duration: 0.5,
						ease: [0.23, 1, 0.32, 1],
						delay: index * 0.1,
					}}
				>
					<div className="mb-4 inline-flex items-center justify-center rounded-full border border-border/40 bg-background p-3 text-primary transition-colors group-hover:border-primary/20 group-hover:bg-primary/5">
						<Icon className="size-6" name={prop.icon} />
					</div>
					<h3 className="mb-3 text-lg font-semibold tracking-tight">
						{prop.title}
					</h3>
					<p className="max-w-xs text-sm leading-relaxed text-muted-foreground md:max-w-none">
						{prop.description}
					</p>
				</motion.div>
			))}
		</div>
	);
}
