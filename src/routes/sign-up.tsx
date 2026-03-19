import { Link, createFileRoute } from '@tanstack/react-router';

import { Spacer } from '@/components/spacer';
import { env } from '@/env';
import { AuthLayout, SignUpForm } from '@/features/auth';

export const Route = createFileRoute('/sign-up')({
	component: SignUpPage,
	head: () => ({
		meta: [
			{ title: 'Sign Up — Cine' },
			{
				name: 'description',
				content:
					'Create your Cine account and start curating your personal cinema journal.',
			},
			{ property: 'og:title', content: 'Sign Up — Cine' },
			{
				property: 'og:description',
				content:
					'Create your Cine account and start curating your personal cinema journal.',
			},
			{ property: 'og:type', content: 'website' },
			{ property: 'og:url', content: `${env.VITE_PUBLIC_SITE_URL}/sign-up` },
			{ name: 'twitter:title', content: 'Sign Up — Cine' },
			{
				name: 'twitter:description',
				content:
					'Create your Cine account and start curating your personal cinema journal.',
			},
		],
	}),
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
				<h1 className="text-center font-serif text-4xl tracking-[-0.04em]">
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
