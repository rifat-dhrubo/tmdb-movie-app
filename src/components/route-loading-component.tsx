import { motion } from 'motion/react';
import React from 'react';

import { cn } from '@/lib/utils';

interface RouteLoadingComponentProps {
	className?: string;
	message?: string;
}

function FilmReel({ className }: { className?: string }) {
	const reelVariants = {
		animate: {
			rotate: 360,
			transition: {
				duration: 2,
				ease: 'linear' as const,
				repeat: Infinity,
			},
		},
	};

	const pulseVariants = {
		animate: {
			opacity: [0.4, 0.8, 0.4],
			scale: [1, 1.02, 1],
			transition: {
				duration: 2,
				ease: 'easeInOut' as const,
				repeat: Infinity,
			},
		},
	};

	return (
		<div className={cn('relative', className)}>
			{/* Outer glow */}
			<motion.div
				animate="animate"
				className="absolute inset-0 rounded-full bg-primary/10 blur-2xl"
				variants={pulseVariants}
			/>

			{/* Film reel container */}
			<motion.div
				animate="animate"
				className="relative flex items-center justify-center"
				variants={reelVariants}
			>
				{/* Main reel circle */}
				<svg
					className="text-muted-foreground/30"
					fill="none"
					height="120"
					stroke="currentColor"
					strokeWidth="1"
					viewBox="0 0 120 120"
					width="120"
				>
					{/* Outer ring */}
					<circle cx="60" cy="60" r="55" />

					{/* Inner hub */}
					<circle cx="60" cy="60" r="12" />

					{/* Spokes */}
					<line x1="60" x2="60" y1="5" y2="48" />
					<line x1="60" x2="60" y1="72" y2="115" />
					<line x1="5" x2="48" y1="60" y2="60" />
					<line x1="72" x2="115" y1="60" y2="60" />

					{/* Diagonal spokes */}
					<line x1="21" x2="48" y1="21" y2="48" />
					<line x1="72" x2="99" y1="72" y2="99" />
					<line x1="99" x2="72" y1="21" y2="48" />
					<line x1="48" x2="21" y1="72" y2="99" />

					{/* Film holes outer ring */}
					<circle cx="60" cy="12" r="3" />
					<circle cx="93" cy="27" r="3" />
					<circle cx="108" cy="60" r="3" />
					<circle cx="93" cy="93" r="3" />
					<circle cx="60" cy="108" r="3" />
					<circle cx="27" cy="93" r="3" />
					<circle cx="12" cy="60" r="3" />
					<circle cx="27" cy="27" r="3" />
				</svg>
			</motion.div>

			{/* Projector light beam */}
			<motion.div
				animate="animate"
				className="absolute top-1/2 left-1/2 h-32 w-1 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-primary/20 via-primary/5 to-transparent"
				variants={pulseVariants}
			/>
		</div>
	);
}

export function RouteLoadingComponent({
	className,
	message = 'Loading the reel',
}: RouteLoadingComponentProps) {
	const [dots, setDots] = React.useState('');

	React.useEffect(() => {
		const interval = setInterval(() => {
			setDots((prev) => (prev.length >= 3 ? '' : prev + '.'));
		}, 500);

		return () => clearInterval(interval);
	}, []);

	return (
		<div
			aria-busy="true"
			aria-live="polite"
			role="status"
			className={cn(
				'flex min-h-[calc(100dvh-90px)] flex-col items-center justify-center bg-background p-8',
				className,
			)}
		>
			<div className="flex flex-col items-center gap-8">
				<FilmReel />

				<div className="space-y-2 text-center">
					<p className="font-serif text-lg tracking-tight text-foreground">
						{message}
						<span className="inline-block w-6 text-primary">{dots}</span>
					</p>

					<p className="text-sm text-muted-foreground">
						Just a moment while we cue this up
					</p>
				</div>
			</div>
		</div>
	);
}
