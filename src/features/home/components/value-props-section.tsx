import { motion } from 'motion/react';

const VALUE_PROPS = [
	{
		icon: (
			<svg
				className="size-6"
				fill="none"
				stroke="currentColor"
				strokeWidth={1.5}
				viewBox="0 0 24 24"
			>
				<path
					d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		),
		title: 'Keep a journal',
		description:
			'Log your thoughts, ratings, and memories for every film you watch. Build your personal cinema history.',
	},
	{
		icon: (
			<svg
				className="size-6"
				fill="none"
				stroke="currentColor"
				strokeWidth={1.5}
				viewBox="0 0 24 24"
			>
				<path
					d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 11.186 0Z"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		),
		title: 'Build your watchlist',
		description:
			'Discover and save films to watch later. Never forget that recommendation from a friend again.',
	},
	{
		icon: (
			<svg
				className="size-6"
				fill="none"
				stroke="currentColor"
				strokeWidth={1.5}
				viewBox="0 0 24 24"
			>
				<path
					d="M16.862 4.487 18.549 2.75a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		),
		title: 'Write notes',
		description:
			'Private reflections on every viewing. Your thoughts, your words, your journey through cinema.',
	},
];

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
						{prop.icon}
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
