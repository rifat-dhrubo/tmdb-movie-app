import type { ErrorComponentProps } from '@tanstack/react-router';
import { motion } from 'motion/react';
import React from 'react';

import { Icon } from '@/components/icon';
import { Button } from '@/components/ui/button';
import { buildTmdbImageUrl } from '@/lib/tmdb/image-config';
import { cn } from '@/lib/utils';

interface RouterErrorComponentProps extends ErrorComponentProps {
	onRetry?: () => void;
	onNavigateHome?: () => void;
	className?: string;
}

const POSTER_PATHS = [
	'/79xm4gXw4l7A5D0XukUOJRocFYQ.jpg',
	'/3bhkrj58Vtu7enYsRolD1fZdja1.jpg',
	'/niNdhTpPHSgw22tK0PLjQMV640v.jpg',
	'/w03EiJVHP8Un77boQeE7hg9DVdU.jpg',
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

function getMovieThemedMessage(error: Error): {
	title: string;
	subtitle: string;
	message: string;
} {
	const message = error.message.toLowerCase();
	const name = error.name.toLowerCase();

	if (
		message.includes('network') ||
		message.includes('fetch') ||
		message.includes('internet') ||
		message.includes('connection') ||
		message.includes('offline')
	) {
		return {
			title: "The connection's been cut",
			subtitle: 'interrupted',
			message:
				"Looks like we've lost the signal. Check your connection and we'll try to resume the show.",
		};
	}

	if (
		message.includes('not found') ||
		message.includes('404') ||
		message.includes('missing') ||
		message.includes('cannot find')
	) {
		return {
			title: 'This reel is missing',
			subtitle: 'misplaced',
			message:
				"We couldn't find what you're looking for. It may have been moved, deleted, or never existed.",
		};
	}

	if (
		message.includes('500') ||
		message.includes('server') ||
		message.includes('internal') ||
		(name.includes('error') && message.includes('unexpected'))
	) {
		return {
			title: 'The projector has broken down',
			subtitle: 'malfunction',
			message:
				'Something went wrong on our end. Our team has been notified and is working on a fix. Please try again in a moment.',
		};
	}

	if (
		message.includes('timeout') ||
		message.includes('timed out') ||
		message.includes('took too long')
	) {
		return {
			title: 'The film jammed',
			subtitle: 'stuck',
			message:
				'Things are taking longer than expected. Give it another try or come back later.',
		};
	}

	if (
		message.includes('unauthorized') ||
		message.includes('forbidden') ||
		message.includes('401') ||
		message.includes('403') ||
		message.includes('permission')
	) {
		return {
			title: "You're not on the guest list",
			subtitle: 'restricted',
			message:
				"You don't have permission to access this area. Please sign in or contact the administrator.",
		};
	}

	if (
		message.includes('validation') ||
		message.includes('invalid') ||
		message.includes('required') ||
		message.includes('format')
	) {
		return {
			title: 'Scene needs a retake',
			subtitle: 'invalid',
			message:
				'Something about your request was off. Check your input and try again.',
		};
	}

	return {
		title: "The show can't go on",
		subtitle: 'interrupted',
		message: 'An unexpected error occurred. Please try again or go back home.',
	};
}

export function RouterErrorComponent({
	className,
	error,
	onNavigateHome,
	onRetry,
}: RouterErrorComponentProps) {
	const { message, subtitle, title } = getMovieThemedMessage(error);

	const handleRetry = () => {
		if (onRetry) {
			onRetry();
		} else {
			window.location.reload();
		}
	};

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
				{/* ERR Watermark */}
				<motion.div
					animate={{ opacity: 0.08 }}
					className="pointer-events-none absolute -top-20 -left-4 select-none"
					initial={{ opacity: 0 }}
					transition={{ duration: 0.5 }}
				>
					<span className="font-serif text-[10rem] leading-none font-bold tracking-tighter text-foreground">
						ERR
					</span>
				</motion.div>

				<div className="relative space-y-6 pt-16">
					<h1 className="font-serif text-3xl leading-tight font-semibold tracking-tight text-foreground">
						{title.split(subtitle)[0]}
						{title.includes(subtitle) ? (
							<em className="text-primary">{subtitle}</em>
						) : null}
						{title.split(subtitle)[1] || ''}
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
						<Button
							className="flex items-center gap-2"
							variant="default"
							onClick={handleRetry}
						>
							<Icon className="size-4" name="arrow_clockwise_bold" />
							Try again
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
