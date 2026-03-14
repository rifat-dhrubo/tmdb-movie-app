import { SignIn } from '@clerk/clerk-react';
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
				{/* Left side - Features */}
				<div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary/10 to-secondary/10 p-12 items-center">
					<div className="max-w-md">
						<h2 className="text-3xl font-bold font-heading mb-6">
							Welcome back to GraphBit Cloud
						</h2>
						<p className="text-muted-foreground mb-8 text-lg">
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
					</div>
				</div>

				{/* Right side - Sign in form */}
				<div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-12">
					<div className="w-full max-w-md">
						<div className="text-center mb-8">
							<h1 className="text-3xl font-bold font-heading text-foreground mb-2">
								Welcome Back
							</h1>
							<p className="text-muted-foreground">
								Sign in to your GraphBit Cloud Platform account
							</p>
						</div>

						<Card className="border-border/50 shadow-lg">
							<CardContent className="p-0">
								<SignIn
									redirectUrl="/"
									signUpUrl="/sign-up"
									appearance={{
										elements: {
											rootBox: 'w-full',
											card: 'bg-transparent border-0 shadow-none',
											headerTitle: 'hidden',
											headerSubtitle: 'hidden',
											socialButtonsBlockButton:
												'bg-muted hover:bg-muted/80 border-border text-foreground',
											socialButtonsBlockButtonText: 'text-foreground',
											dividerLine: 'bg-border',
											dividerText: 'text-muted-foreground',
											formFieldInput:
												'bg-background border-border text-foreground focus:border-primary',
											formFieldLabel: 'text-foreground',
											footerActionLink: 'text-primary hover:text-primary/80',
											identityPreviewText: 'text-foreground',
											identityPreviewEditButton:
												'text-primary hover:text-primary/80',
											formButtonPrimary:
												'bg-primary hover:bg-primary/90 text-primary-foreground',
											formFieldErrorText: 'text-destructive',
											alertClerkError: 'text-destructive',
											formFieldSuccessText: 'text-green-600',
											footerActionText: 'text-muted-foreground',
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
								By signing in, you agree to our{' '}
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
								Don&apos;t have an account?{' '}
								<Link
									className="text-primary hover:text-primary/80 font-medium underline transition-colors"
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
