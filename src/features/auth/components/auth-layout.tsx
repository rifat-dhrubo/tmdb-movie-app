import { Link } from '@tanstack/react-router';
import { motion } from 'motion/react';
import type React from 'react';

import { AuthPosterStack } from './auth-poster-stack';

import { SiteLogo } from '@/components/site';

interface AuthLayoutProps {
	children: React.ReactNode;
	quote: {
		text: string;
		attribution: string;
	};
}

export function AuthLayout({ children, quote }: AuthLayoutProps) {
	return (
		<div className="grid min-h-svh lg:grid-cols-2">
			<div className="relative hidden flex-col overflow-hidden bg-(--card-dark) lg:flex">
				<div className="p-10">
					<motion.div
						className="pointer-events-none absolute -top-25 -right-25 z-10 size-70 rounded-full bg-primary opacity-50 blur-[150px]"
						animate={{
							x: [0, 15, -10, 0],
							y: [0, -20, 15, 0],
							scale: [1, 1.15, 1],
							opacity: [0.5, 0.7, 0.5],
						}}
						transition={{
							duration: 10,
							ease: 'easeInOut',
							repeat: Infinity,
							repeatType: 'reverse',
						}}
					/>
					<motion.div
						className="pointer-events-none absolute -bottom-25 -left-25 z-10 size-70 rounded-full bg-primary opacity-50 blur-[150px]"
						animate={{
							x: [0, -12, 8, 0],
							y: [0, 18, -15, 0],
							scale: [1, 1.2, 1],
							opacity: [0.5, 0.65, 0.5],
						}}
						transition={{
							duration: 12,
							delay: 1.5,
							ease: 'easeInOut',
							repeat: Infinity,
							repeatType: 'reverse',
						}}
					/>
					<SiteLogo />
				</div>

				<div className="flex flex-1 items-end justify-between gap-6 p-10">
					<div>
						<blockquote className="mb-3 max-w-sm font-serif text-xl leading-snug font-light text-primary-foreground/85 italic dark:text-foreground">
							&ldquo;{quote.text}&rdquo;
						</blockquote>
						<p className="text-xs tracking-wide text-primary-foreground/40 dark:text-muted-foreground">
							&mdash; {quote.attribution}
						</p>
					</div>

					<AuthPosterStack />
				</div>
			</div>

			<div className="flex flex-col gap-4 bg-background p-6 md:p-10">
				<div className="flex justify-start">
					<Link
						className="flex items-center gap-2 font-serif text-lg text-foreground"
						to="/"
					>
						<SiteLogo />
					</Link>
				</div>

				<div className="animate-fade-in flex flex-1 items-center justify-center">
					<div className="w-full max-w-sm lg:max-w-md">{children}</div>
				</div>
			</div>
		</div>
	);
}
