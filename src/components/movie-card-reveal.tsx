import type React from 'react';

import { cn } from '@/lib/utils';

const MOVIE_CARD_REVEAL_STEPS = 8;
const MOVIE_CARD_REVEAL_STEP_MS = 32;

interface MovieCardRevealProps extends React.ComponentProps<'div'> {
	index: number;
}

export function MovieCardReveal({
	children,
	className,
	index,
	style,
	...props
}: MovieCardRevealProps) {
	const revealStyle = {
		'--movie-card-delay': `${(index % MOVIE_CARD_REVEAL_STEPS) * MOVIE_CARD_REVEAL_STEP_MS}ms`,
		...style,
	} as React.CSSProperties & { '--movie-card-delay': string };

	return (
		<div
			className={cn('movie-card-reveal', className)}
			style={revealStyle}
			{...props}
		>
			{children}
		</div>
	);
}
