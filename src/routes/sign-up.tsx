import { SignUp } from '@clerk/clerk-react';
import { Link, createFileRoute } from '@tanstack/react-router';
import { ArrowLeft, Globe, Package, TrendingUp, Zap } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export const Route = createFileRoute('/sign-up')({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
			{/* Navigation */}
			<nav className="border-b border-border/40 backdrop-blur-sm bg-background/80">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between items-center h-16">
						<div className="flex items-center space-x-2">
							<div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
								<Zap className="w-5 h-5 text-white" />
							</div>
							<span className="text-xl font-bold font-heading">
								GraphBit Cloud
							</span>
						</div>
						<Button asChild variant="ghost">
							<Link className="flex items-center space-x-2" to="/">
								<ArrowLeft className="w-4 h-4" />
								<span>Back to Home</span>
							</Link>
						</Button>
					</div>
				</div>
			</nav>

			<div className="flex min-h-[calc(100vh-4rem)]">
				{/* Left side - Benefits */}
				<div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary/10 to-secondary/10 p-12 items-center">
					<div className="max-w-md">
						<h2 className="text-3xl font-bold font-heading mb-6">
							Start building the future
						</h2>
						<p className="text-muted-foreground mb-8 text-lg">
							Join thousands of developers who trust GraphBit Cloud for their
							applications.
						</p>

						<div className="space-y-6">
							{[
								{
									icon: Package,
									title: 'Rich Component Library',
									description:
										'Access thousands of pre-built components and templates',
								},
								{
									icon: Globe,
									title: 'Global Infrastructure',
									description: 'Deploy worldwide with our edge network and CDN',
								},
								{
									icon: TrendingUp,
									title: 'Monetize Your Work',
									description:
										'Sell your components and earn from your creations',
								},
							].map((feature, index) => (
								<div key={index} className="flex items-start space-x-3">
									<div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center flex-shrink-0">
										<feature.icon className="w-5 h-5 text-primary" />
									</div>
									<div>
										<h3 className="font-semibold mb-1">{feature.title}</h3>
										<p className="text-sm text-muted-foreground">
											{feature.description}
										</p>
									</div>
								</div>
							))}
						</div>

						<div className="mt-8 p-4 bg-background/50 rounded-lg border border-border/50">
							<p className="text-sm text-muted-foreground">
								<span className="font-semibold text-foreground">
									Free to start:
								</span>{' '}
								No credit card required. Get started with our generous free tier
								and upgrade as you grow.
							</p>
						</div>
					</div>
				</div>

				{/* Right side - Sign up form */}
				<div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-12">
					<div className="w-full max-w-md">
						<div className="text-center mb-8">
							<h1 className="text-3xl font-bold font-heading text-foreground mb-2">
								Join GraphBit Cloud
							</h1>
							<p className="text-muted-foreground">
								Create your account and start building amazing GraphBit
								applications
							</p>
						</div>

						<Card className="border-border/50 shadow-xl bg-background/50 backdrop-blur-sm">
							<CardContent className="p-8">
								<SignUp
									redirectUrl="/"
									signInUrl="/sign-in"
									appearance={{
										elements: {
											rootBox: 'w-full',
											card: 'bg-transparent border-0 shadow-none',
											headerTitle: 'hidden',
											headerSubtitle: 'hidden',
											socialButtonsBlockButton:
												'bg-muted hover:bg-muted/80 border-border text-foreground transition-colors duration-200',
											socialButtonsBlockButtonText: 'text-foreground',
											dividerLine: 'bg-border',
											dividerText: 'text-muted-foreground',
											formFieldInput:
												'bg-background border-border text-foreground focus:border-primary transition-colors duration-200',
											formFieldLabel: 'text-foreground font-medium',
											footerActionLink:
												'text-primary hover:text-primary/80 transition-colors',
											identityPreviewText: 'text-foreground',
											identityPreviewEditButton:
												'text-primary hover:text-primary/80 transition-colors',
											formButtonPrimary:
												'bg-primary hover:bg-primary/90 text-primary-foreground transition-colors duration-200',
											formFieldErrorText: 'text-destructive',
											alertClerkError:
												'text-destructive bg-destructive/10 border border-destructive/20 rounded-lg p-3',
											formFieldSuccessText: 'text-green-600',
											footerActionText:
												'text-muted-foreground hover:text-foreground transition-colors',
										},
										layout: {
											socialButtonsPlacement: 'top',
											socialButtonsVariant: 'blockButton',
										},
									}}
								/>
							</CardContent>
						</Card>

						<div className="text-center mt-6">
							<p className="text-sm text-muted-foreground">
								By signing up, you agree to our{' '}
								<a
									className="text-primary hover:text-primary/80 underline transition-colors"
									href="/terms"
								>
									Terms of Service
								</a>{' '}
								and{' '}
								<a
									className="text-primary hover:text-primary/80 underline transition-colors"
									href="/privacy"
								>
									Privacy Policy
								</a>
							</p>
						</div>

						<div className="text-center mt-4">
							<p className="text-sm text-muted-foreground">
								Already have an account?{' '}
								<Link
									className="text-primary hover:text-primary/80 font-medium underline transition-colors"
									to="/sign-in"
								>
									Sign in here
								</Link>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
