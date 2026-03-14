import { Link, createFileRoute } from '@tanstack/react-router';

import { Spacer } from '@/components/spacer';
import { AuthLayout, SignInForm } from '@/features/auth';

export const Route = createFileRoute('/sign-in')({
	component: SignInPage,
});

function SignInPage() {
	return (
		<AuthLayout
			quote={{
				text: 'The only place to keep track of every film I actually want to watch.',
				attribution: '4.8 stars · 2,400+ cinephiles',
			}}
		>
			<h1 className="text-center font-serif text-4xl font-bold">
				Welcome back
			</h1>
			<Spacer size={6}></Spacer>
			<p className="text-center text-base text-balance text-muted-foreground">
				Sign in to your account
			</p>

			<SignInForm />

			<Spacer size={12}></Spacer>

			<p className="text-center text-sm text-muted-foreground">
				Don&apos;t have an account?{' '}
				<Link className="underline underline-offset-4" to="/sign-up">
					Sign up
				</Link>
			</p>
		</AuthLayout>
	);
}
