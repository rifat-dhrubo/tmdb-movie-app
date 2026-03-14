import { Link } from '@tanstack/react-router';
import type React from 'react';

import { AuthPosterStack } from './auth-poster-stack';

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
			<div className="hidden flex-col overflow-hidden bg-(--card-dark) lg:flex">
				<div className="p-10">
					<img alt="Cine Logo" className="size-5" src="/logo192.png" />
				</div>

				<div className="flex flex-1 items-end justify-between gap-6 p-10">
					<div>
						<blockquote className="mb-3 max-w-sm font-serif text-xl leading-snug font-light text-primary-foreground/85 italic">
							&ldquo;{quote.text}&rdquo;
						</blockquote>
						<p className="text-xs tracking-wide text-primary-foreground/40">
							&mdash; {quote.attribution}
						</p>
					</div>

					<AuthPosterStack />
				</div>
			</div>

			<div className="flex flex-col gap-4 bg-background p-6 md:p-10">
				<div className="flex justify-center gap-2 md:justify-start">
					<Link
						className="flex items-center gap-2 font-serif text-lg font-bold text-foreground"
						to="/"
					>
						<img alt="Cine Logo" className="size-5" src="/logo192.png" />
					</Link>
				</div>

				<div className="flex flex-1 items-center justify-center">
					<div className="w-full max-w-sm lg:max-w-md">{children}</div>
				</div>
			</div>
		</div>
	);
}
