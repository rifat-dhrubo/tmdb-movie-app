import { Link, createFileRoute } from '@tanstack/react-router';
import { ArrowLeft, Rocket, Shield, Users, Zap } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export const Route = createFileRoute('/sign-in')({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
			{/* Navigation */}
			<nav className="border-b border-border/40 bg-background/80 backdrop-blur-sm">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="flex h-16 items-center justify-between">
						<div className="flex items-center space-x-2">
							<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary">
								<Zap className="h-5 w-5 text-white" />
							</div>
							<span className="font-heading text-xl font-bold">
								GraphBit Cloud
							</span>
						</div>
						<Button asChild variant="ghost">
							<Link className="flex items-center space-x-2" to="/">
								<ArrowLeft className="h-4 w-4" />
								<span>Back to Home</span>
							</Link>
						</Button>
					</div>
				</div>
			</nav>

			<div className="flex min-h-[calc(100vh-4rem)]">
				{/* Left side - Features */}
				<div className="hidden items-center bg-gradient-to-br from-primary/10 to-secondary/10 p-12 lg:flex lg:w-1/2">
					<div className="max-w-md">
						<h2 className="font-heading mb-6 text-3xl font-bold">
							Welcome back to GraphBit Cloud
						</h2>
						<p className="mb-8 text-lg text-muted-foreground">
							Continue building amazing applications with our powerful platform.
						</p>

						<div className="space-y-6">
							{[
								{
									icon: Shield,
									title: 'Secure & Reliable',
									description:
										'Enterprise-grade security with 99.9% uptime guarantee',
								},
								{
									icon: Users,
									title: 'Collaborative',
									description:
										'Work seamlessly with your team on shared projects',
								},
								{
									icon: Rocket,
									title: 'Fast Deployment',
									description: 'Deploy your applications in seconds, not hours',
								},
							].map((feature, index) => (
								<div key={index} className="flex items-start space-x-3">
									<div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20">
										<feature.icon className="h-5 w-5 text-primary" />
									</div>
									<div>
										<h3 className="mb-1 font-semibold">{feature.title}</h3>
										<p className="text-sm text-muted-foreground">
											{feature.description}
										</p>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>

				{/* Right side - Sign in form */}
				<div className="flex flex-1 items-center justify-center p-4 sm:p-6 lg:p-12">
					<div className="w-full max-w-md">
						<div className="mb-8 text-center">
							<h1 className="font-heading mb-2 text-3xl font-bold text-foreground">
								Welcome Back
							</h1>
							<p className="text-muted-foreground">
								Sign in to your GraphBit Cloud Platform account
							</p>
						</div>

						<Card className="border-border/50 shadow-lg">
							<CardContent className="p-0">sign in</CardContent>
						</Card>

						<div className="mt-6 text-center">
							<p className="text-sm text-muted-foreground">
								By signing in, you agree to our{' '}
								<a
									className="text-primary underline transition-colors hover:text-primary/80"
									href="/terms"
								>
									Terms of Service
								</a>{' '}
								and{' '}
								<a
									className="text-primary underline transition-colors hover:text-primary/80"
									href="/privacy"
								>
									Privacy Policy
								</a>
							</p>
						</div>

						<div className="mt-4 text-center">
							<p className="text-sm text-muted-foreground">
								Don&apos;t have an account?{' '}
								<Link
									className="font-medium text-primary underline transition-colors hover:text-primary/80"
									to="/sign-up"
								>
									Sign up for free
								</Link>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
