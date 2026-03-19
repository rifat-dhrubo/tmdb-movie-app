import React from 'react';

import { cn } from '@/lib/utils';

interface MovieCardStampOverlayProps {
	visible: boolean;
	onAnimationComplete?: () => void;
}

export function MovieCardStampOverlay({
	onAnimationComplete,
	visible,
}: MovieCardStampOverlayProps) {
	const [phase, setPhase] = React.useState<
		'hidden' | 'entering' | 'visible' | 'exiting'
	>('hidden');

	React.useEffect(() => {
		if (!visible) {
			setPhase('hidden');
			return;
		}

		// Start animation sequence
		setPhase('entering');

		const enteringTimer = setTimeout(() => {
			setPhase('visible');
		}, 300);

		const visibleTimer = setTimeout(() => {
			setPhase('exiting');
		}, 1300);

		const exitTimer = setTimeout(() => {
			setPhase('hidden');
			onAnimationComplete?.();
		}, 1700);

		return () => {
			clearTimeout(enteringTimer);
			clearTimeout(visibleTimer);
			clearTimeout(exitTimer);
		};
	}, [visible, onAnimationComplete]);

	if (phase === 'hidden') {
		return null;
	}

	const prefersReducedMotion =
		typeof window !== 'undefined' &&
		window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	if (prefersReducedMotion) {
		return (
			<div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center bg-background/60 backdrop-blur-[2px]">
				<span className="mb-6 font-mono text-[10px] tracking-[0.3em] text-primary uppercase">
					Saved
				</span>
				<div className="flex size-20 items-center justify-center rounded-full border-2 border-dashed border-primary">
					<span className="font-mono text-[10px] tracking-[0.2em] text-primary uppercase">
						Admit
						<br />
						One
					</span>
				</div>
			</div>
		);
	}

	return (
		<div
			className={cn(
				'pointer-events-none absolute inset-0 flex flex-col items-center justify-center bg-background/60 backdrop-blur-[2px] transition-all',
				phase === 'entering' && 'animate-stamp-enter',
				phase === 'visible' && 'opacity-100',
				phase === 'exiting' && 'animate-stamp-exit',
			)}
		>
			<span
				style={{ transitionDuration: '300ms' }}
				className={cn(
					'mb-6 font-mono text-[10px] tracking-[0.3em] text-primary uppercase transition-all',
					phase === 'entering' && 'translate-y-2 opacity-0',
					phase === 'visible' && 'translate-y-0 opacity-100',
					phase === 'exiting' && 'translate-y-0 opacity-0',
				)}
			>
				Saved
			</span>
			<div
				style={{ transitionDuration: phase === 'entering' ? '300ms' : '400ms' }}
				className={cn(
					'flex size-20 items-center justify-center rounded-full border-2 border-dashed border-primary transition-all',
					phase === 'entering' && 'scale-75 opacity-0',
					phase === 'visible' && 'scale-100 opacity-100',
					phase === 'exiting' && 'scale-90 opacity-0',
				)}
			>
				<span className="text-center font-mono text-[10px] leading-tight tracking-[0.2em] text-primary uppercase">
					Admit
					<br />
					One
				</span>
			</div>
		</div>
	);
}
