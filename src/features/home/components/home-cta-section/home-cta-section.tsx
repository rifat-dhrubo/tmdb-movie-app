import { motion, useReducedMotion } from 'motion/react';
import type { Variants } from 'motion/react';

import {
	DESKTOP_PRIMARY_POSTERS,
	DESKTOP_SECONDARY_POSTERS,
	MOBILE_RAIL_POSTERS,
} from './home-cta-section-constants';
import { HomeCtaSectionContent } from './home-cta-section-content';
import { HomeCtaSectionPosterRail } from './home-cta-section-poster-rail';
import type { CtaContent } from './types';

import { useAuth } from '@/features/auth';
import { cn } from '@/lib/utils';

const containerVariants: Variants = {
	hidden: { opacity: 1 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
			delayChildren: 0.05,
		},
	},
};

const itemVariants: Variants = {
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

function getCtaContent(user: ReturnType<typeof useAuth>['user']): CtaContent {
	return user
		? {
				badge: 'Welcome back',
				headline: ['Curate your', 'cinema'],
				accentWord: 'journal.',
				body: 'Return to your personal film journal and pick up where you left off.',
				primaryCta: { text: 'Open your journal', href: '/watchlist' },
				secondaryCta: { text: 'Discover films', href: '/search' },
				footnote: 'Your journey through cinema continues',
			}
		: {
				badge: 'FREE FOREVER',
				headline: ['Start your', 'cinema'],
				accentWord: 'journal.',
				body: "Join cinephiles who've found a better way to track, discover, and remember great films.",
				primaryCta: { text: 'Create your journal', href: '/sign-up' },
				secondaryCta: { text: 'Sign in', href: '/sign-in' },
				footnote: 'No card required · Free forever',
			};
}

export function HomeCtaSection() {
	const { user } = useAuth();
	const shouldReduceMotion = useReducedMotion() ?? false;
	const content = getCtaContent(user);

	return (
		<motion.section
			className="relative overflow-hidden bg-(--card-dark)"
			initial={shouldReduceMotion ? 'visible' : 'hidden'}
			variants={containerVariants}
			viewport={{ amount: 0.3, once: true }}
			whileInView="visible"
		>
			<div
				className={cn(
					'pointer-events-none absolute -top-28 -left-28 z-0 size-80 rounded-full bg-primary/30 blur-[120px]',
					!shouldReduceMotion && 'animate-cta-glow-a',
				)}
			/>
			<div
				className={cn(
					'pointer-events-none absolute -right-32 -bottom-32 z-0 size-96 rounded-full bg-primary/22 blur-[140px]',
					!shouldReduceMotion && 'animate-cta-glow-b',
				)}
			/>
			<div
				className={cn(
					'pointer-events-none absolute top-24 left-1/3 z-0 hidden size-64 -translate-x-1/2 rounded-full bg-primary/16 blur-[110px] md:block',
					!shouldReduceMotion && 'animate-cta-glow-c',
				)}
			/>

			<div
				aria-hidden
				className="pointer-events-none absolute inset-x-0 -bottom-6 z-0 md:hidden"
			>
				<div className="absolute inset-x-0 bottom-0">
					<HomeCtaSectionPosterRail
						className="opacity-70 saturate-[0.85]"
						direction="forward"
						disableAnimation={shouldReduceMotion}
						posters={MOBILE_RAIL_POSTERS}
						seed={0}
						size="sm"
					/>
				</div>
			</div>

			<div
				aria-hidden
				className="pointer-events-none absolute inset-x-0 -bottom-10 z-0 hidden md:block"
			>
				<div className="absolute inset-x-0 bottom-0 flex flex-col gap-5 opacity-60 xl:-bottom-4">
					<HomeCtaSectionPosterRail
						direction="forward"
						disableAnimation={shouldReduceMotion}
						posters={DESKTOP_PRIMARY_POSTERS}
						seed={1}
						size="md"
					/>
					<div className="opacity-70">
						<HomeCtaSectionPosterRail
							className="opacity-75 saturate-[0.88]"
							direction="reverse"
							disableAnimation={shouldReduceMotion}
							posters={DESKTOP_SECONDARY_POSTERS}
							seed={3}
							size="sm"
						/>
					</div>
				</div>
			</div>

			<div className="relative z-10 flex min-h-[78svh] flex-col items-center justify-center px-4 py-24 sm:min-h-[82svh] md:min-h-[88svh] md:py-28 lg:min-h-[92svh] lg:py-32">
				<HomeCtaSectionContent content={content} variants={itemVariants} />
			</div>
		</motion.section>
	);
}
