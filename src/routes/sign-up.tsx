import { Link, createFileRoute } from '@tanstack/react-router';

import { Spacer } from '@/components/spacer';
import { AuthLayout, SignUpForm } from '@/features/auth';

export const Route = createFileRoute('/sign-up')({
	component: SignUpPage,
});

function SignUpPage() {
	return (
		<AuthLayout
			quote={{
				text: 'Cinema is a mirror that can change the world — start building yours.',
				attribution: 'Join 2,400+ cinephiles curating their watchlists',
			}}
		>
			<div className="stagger-children">
				<h1 className="text-center font-serif text-4xl font-bold tracking-tight">
					Create your account{' '}
				</h1>
				<Spacer size={6}></Spacer>
				<p className="mx-auto max-w-sm text-center text-base text-pretty text-muted-foreground">
					Discover films & start curating your personal cinema journal
				</p>

				<Spacer size={8}></Spacer>

				<SignUpForm />

				<Spacer size={6}></Spacer>

				<p className="text-center text-sm text-muted-foreground">
					Already have an account?{' '}
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
