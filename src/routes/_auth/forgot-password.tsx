import { Link, createFileRoute } from '@tanstack/react-router';

import { Spacer } from '@/components/spacer';
import { env } from '@/env';
import { ForgotPasswordForm } from '@/features/auth';

export const Route = createFileRoute('/_auth/forgot-password')({
	component: ForgotPasswordPage,
	staticData: {
		authQuote: {
			text: "Everyone forgets sometimes. Let's get you back on track.",
			attribution: 'Your personal cinema journal awaits',
		},
	},
	head: () => ({
		meta: [
			{ title: 'Forgot Password — Cine' },
			{
				name: 'description',
				content: 'Reset your Cine account password.',
			},
			{ property: 'og:title', content: 'Forgot Password — Cine' },
			{
				property: 'og:description',
				content: 'Reset your Cine account password.',
			},
			{ property: 'og:type', content: 'website' },
			{
				property: 'og:url',
				content: `${env.VITE_PUBLIC_SITE_URL}/forgot-password`,
			},
			{ name: 'twitter:title', content: 'Forgot Password — Cine' },
			{
				name: 'twitter:description',
				content: 'Reset your Cine account password.',
			},
		],
	}),
});

function ForgotPasswordPage() {
	return (
		<div className="stagger-children">
			<h1 className="text-center font-serif text-4xl tracking-[-0.04em]">
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
	);
}
