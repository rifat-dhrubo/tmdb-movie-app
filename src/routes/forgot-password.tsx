import { Link, createFileRoute } from '@tanstack/react-router';

import { Spacer } from '@/components/spacer';
import { AuthLayout, ForgotPasswordForm } from '@/features/auth';

export const Route = createFileRoute('/forgot-password')({
	component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
	return (
		<AuthLayout
			quote={{
				text: "Everyone forgets sometimes. Let's get you back on track.",
				attribution: 'Your personal cinema journal awaits',
			}}
		>
			<div className="stagger-children">
				<h1 className="text-center font-serif text-4xl font-bold tracking-tight">
					Forgot password?
				</h1>
				<Spacer size={6}></Spacer>
				<p className="text-center text-base text-balance text-muted-foreground">
					No worries, we&apos;ll send you reset instructions
				</p>

				<Spacer size={8}></Spacer>

				<ForgotPasswordForm />

				<Spacer size={6}></Spacer>

				<p className="text-center text-sm text-muted-foreground">
					Remember your password?{' '}
					<Link
						className="text-foreground underline underline-offset-4 transition-colors hover:text-foreground/80"
						to="/sign-in"
					>
						Sign in
					</Link>
				</p>
			</div>
		</AuthLayout>
	);
}
