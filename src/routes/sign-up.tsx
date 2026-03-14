import { Link, createFileRoute } from '@tanstack/react-router';

import { PosterStack, SignUpForm } from '@/features/auth';

export const Route = createFileRoute('/sign-up')({
	component: SignUpPage,
});

function SignUpPage() {
	return (
		<div className="grid min-h-svh lg:grid-cols-2">
			<div className="hidden flex-col overflow-hidden bg-(--card-dark) lg:flex">
				<div className="p-10">
					<img alt="Cine Logo" className="size-5" src="/logo192.png" />
				</div>

				<div className="flex flex-1 items-end justify-between gap-6 p-10">
					<div>
						<blockquote className="mb-3 max-w-sm font-serif text-xl leading-snug font-light text-primary-foreground/85 italic">
							&ldquo;Cinema is a mirror that can change the world &mdash; start
							building yours.&rdquo;
						</blockquote>
						<p className="text-xs tracking-wide text-primary-foreground/40">
							&mdash; Join 2,400+ cinephiles curating their watchlists
						</p>
					</div>

					<PosterStack />
				</div>
			</div>

			<div className="flex flex-col gap-4 p-6 md:p-10">
				<div className="flex justify-center gap-2 md:justify-start">
					<Link
						className="flex items-center gap-2 font-serif text-lg font-bold text-foreground"
						to="/"
					>
						<img alt="Cine Logo" className="size-5" src="/logo192.png" />
					</Link>
				</div>

				<div className="flex flex-1 items-center justify-center">
					<div className="w-full max-w-sm lg:max-w-xs">
						<SignUpForm />
					</div>
				</div>
			</div>
		</div>
	);
}
