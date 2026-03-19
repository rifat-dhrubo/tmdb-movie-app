import { motion } from 'motion/react';
import React from 'react';

import { Icon } from '@/components/icon';
import { Button } from '@/components/ui/button';
import { buildTmdbImageUrl } from '@/lib/tmdb/image-config';
import { cn } from '@/lib/utils';

interface RouteNotFoundComponentProps {
	className?: string;
	onNavigateHome?: () => void;
	title?: string;
	message?: string;
}

const POSTER_PATHS = [
	'/8Tfys3mDZVp4tNoH2ktm06a0Tau.jpg',
	'/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
	'/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg',
	'/hek3koDUyRQk7FIhPXsa6mT2Zc3.jpg',
];

function ScatteredPosters() {
	const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);

	const newLocal = 'relative h-[500px] w-[350px]';
	return (
		<div className="fixed top-1/3 right-24 hidden -translate-y-1/2 lg:block">
			<div className={newLocal}>
				{POSTER_PATHS.map((path, i) => {
					const positions = [
						{ top: '5%', right: '5%', rotate: -12, scale: 1 },
						{ top: '40%', right: '40%', rotate: 8, scale: 0.9 },
						{ top: '70%', right: '-5%', rotate: -5, scale: 0.85 },
						{ top: '100%', right: '35%', rotate: 10, scale: 0.8 },
					];
					const pos = positions[i];
					const imageUrl = buildTmdbImageUrl({ type: 'poster', path });
					const isHovered = hoveredIndex === i;

					return (
						<motion.div
							key={i}
							className="absolute cursor-pointer overflow-hidden rounded-xl shadow-xl"
							initial={{ rotate: pos.rotate }}
							animate={{
								rotate: isHovered ? 0 : pos.rotate,
								scale: isHovered ? 1.03 : 1,
							}}
							style={{
								top: pos.top,
								right: pos.right,
								width: `${300 * pos.scale}px`,
							}}
							transition={{
								type: 'spring',
								stiffness: 120,
								damping: 20,
								mass: 0.8,
							}}
							onMouseEnter={() => setHoveredIndex(i)}
							onMouseLeave={() => setHoveredIndex(null)}
						>
							<motion.div
								className="h-full w-full"
								whileHover={{
									boxShadow: '0 20px 40px -8px rgba(0, 0, 0, 0.25)',
								}}
							>
								<img
									alt=""
									className="aspect-2/3 w-full bg-muted object-cover"
									loading="lazy"
									src={imageUrl ?? undefined}
								/>
							</motion.div>
						</motion.div>
					);
				})}
			</div>
		</div>
	);
}

export function RouteNotFoundComponent({
	className,
	message = "We couldn't find what you're looking for. It may have been moved, deleted, or never existed.",
	onNavigateHome,
	title = 'This reel is missing',
}: RouteNotFoundComponentProps) {
	const handleNavigateHome = () => {
		if (onNavigateHome) {
			onNavigateHome();
		} else {
			window.location.href = '/';
		}
	};

	return (
		<div
			aria-live="assertive"
			role="alert"
			className={cn(
				'relative flex min-h-[calc(100dvh-90px)] items-center bg-background p-8 lg:p-16',
				className,
			)}
		>
			<ScatteredPosters />

			<div className="relative z-10 w-full max-w-lg">
				{/* MIA Watermark - smaller than ERR */}
				<motion.div
					animate={{ opacity: 0.06 }}
					className="pointer-events-none absolute -top-16 -left-4 select-none"
					initial={{ opacity: 0 }}
					transition={{ duration: 0.5 }}
				>
					<span className="font-serif text-8xl leading-none font-bold tracking-tighter text-foreground">
						MIA
					</span>
				</motion.div>

				<div className="relative space-y-6 pt-12">
					<h1 className="font-serif text-3xl leading-tight tracking-[-0.04em] text-foreground">
						{title.includes('missing') ? (
							<>
								This reel is <em className="text-primary">missing</em>
							</>
						) : (
							title
						)}
					</h1>

					<p className="max-w-md text-base leading-relaxed text-muted-foreground">
						{message}
					</p>

					<div className="flex flex-wrap items-center gap-3 pt-2">
						<Button
							className="flex items-center gap-2"
							variant="outline"
							onClick={handleNavigateHome}
						>
							<Icon className="size-4" name="house_bold" />
							Back to home
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
