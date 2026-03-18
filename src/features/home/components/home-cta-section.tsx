import { Link } from '@tanstack/react-router';

import { Button } from '@/components/ui/button';
import { useAuth } from '@/features/auth';

export function HomeCtaSection() {
	const { user } = useAuth();

	return (
		<section className="relative overflow-hidden bg-[#0F0D0B] py-24 md:py-32">
			{/* Atmospheric background texture */}
			<div className="pointer-events-none absolute inset-0 opacity-[0.03]">
				<div
					className="absolute inset-0"
					style={{
						backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
					}}
				/>
			</div>

			{/* Gradient overlay for depth */}
			<div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />

			<div className="relative container mx-auto px-4 md:px-6">
				<div className="flex flex-col items-center text-center">
					{/* Eyebrow pill - light on dark */}
					<span className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs tracking-wider text-white/60 uppercase backdrop-blur-sm">
						<span className="size-1.5 rounded-full bg-primary" />
						{user ? 'Welcome Back' : 'Free Forever'}
					</span>

					{user ? (
						<>
							<h2 className="font-serif text-4xl leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
								Continue your{' '}
								<em className="text-primary not-italic">cinema</em>
							</h2>
							<p className="mx-auto mt-6 max-w-lg text-lg text-white/60">
								Return to your personal film journal and keep curating the films
								that matter.
							</p>
							<Button
								asChild
								className="motion-pressable mt-10 rounded-full px-8"
								size="lg"
							>
								<Link to="/watchlist">Open your journal</Link>
							</Button>
						</>
					) : (
						<>
							<h2 className="font-serif text-4xl leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
								Start your cinema{' '}
								<em className="text-primary not-italic">journal</em>
							</h2>
							<p className="mx-auto mt-6 max-w-lg text-lg text-white/60">
								Join cinephiles who&apos;ve found a better way to track,
								discover, and remember great films.
							</p>
							<div className="mt-10 flex flex-col gap-4 sm:flex-row">
								<Button
									asChild
									className="motion-pressable rounded-full px-8"
									size="lg"
								>
									<Link to="/sign-up">Create your journal</Link>
								</Button>
								<Button
									asChild
									className="motion-pressable gap-2 rounded-full border-white/20 bg-white/5 px-8 text-white hover:bg-white/10 hover:text-white"
									size="lg"
									variant="outline"
								>
									<Link to="/sign-in">
										Sign in
										<svg
											className="size-4"
											fill="none"
											stroke="currentColor"
											strokeWidth={2}
											viewBox="0 0 24 24"
										>
											<path
												d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
										</svg>
									</Link>
								</Button>
							</div>
							<p className="mt-6 text-sm text-white/40">
								No card required · Free forever
							</p>
						</>
					)}
				</div>
			</div>
		</section>
	);
}
