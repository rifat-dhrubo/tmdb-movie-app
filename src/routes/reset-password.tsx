import { Link, createFileRoute } from '@tanstack/react-router';
import { verifyPasswordResetCode } from 'firebase/auth';
import React from 'react';
import { z } from 'zod';

import { Icon } from '@/components/icon';
import { Spacer } from '@/components/spacer';
import { AuthLayout, ResetPasswordForm } from '@/features/auth';
import { auth } from '@/lib/firebase/config';

const searchSchema = z.object({
	oobCode: z.string(),
});

export const Route = createFileRoute('/reset-password')({
	component: ResetPasswordPage,
	validateSearch: searchSchema,
});

function ResetPasswordPage() {
	const { oobCode } = Route.useSearch();
	const [email, setEmail] = React.useState<string | null>(null);
	const [error, setError] = React.useState<{
		title: string;
		description: string;
	} | null>(null);
	const [isVerifying, setIsVerifying] = React.useState(true);

	React.useEffect(() => {
		let cancelled = false;

		async function verifyCode() {
			try {
				const verifiedEmail = await verifyPasswordResetCode(auth, oobCode);
				if (!cancelled) {
					setEmail(verifiedEmail);
					setError(null);
				}
			} catch (err) {
				if (!cancelled) {
					const errorMessage = getErrorMessage(err);
					setError(errorMessage);
					setEmail(null);
				}
			} finally {
				if (!cancelled) {
					setIsVerifying(false);
				}
			}
		}

		void verifyCode();

		return () => {
			cancelled = true;
		};
	}, [oobCode]);

	let heading: string;
	let subheading: string;

	if (isVerifying) {
		heading = 'Verifying...';
		subheading = 'Please wait while we verify your reset link';
	} else if (error) {
		heading = error.title;
		subheading = 'Please request a new reset link';
	} else {
		heading = 'Reset password';
		subheading = 'Enter your new password below';
	}

	return (
		<AuthLayout
			quote={{
				text: 'A fresh start is just a few clicks away.',
				attribution: 'Create a new password to continue',
			}}
		>
			<div className="stagger-children">
				<h1 className="text-center font-serif text-4xl font-bold tracking-tight">
					{heading}
				</h1>
				<Spacer size={6}></Spacer>
				<p className="max-w-xs text-center text-base text-balance text-muted-foreground">
					{subheading}
				</p>

				<Spacer size={8}></Spacer>

				{isVerifying ? (
					<div className="animate-fade-in flex flex-col items-center justify-center gap-4 py-8">
						<Icon
							className="size-8 animate-spin text-muted-foreground"
							name="spinner_bold"
						/>
					</div>
				) : error ? (
					<div className="stagger-children flex flex-col items-center gap-6 py-6 text-center">
						<div className="h-1 w-12 rounded-full bg-primary/60" />

						<p className="max-w-xs font-sans text-base leading-relaxed font-light text-pretty text-muted-foreground">
							{error.description}
						</p>

						<div className="pt-2">
							<Link
								className="font-sans text-sm font-medium text-primary underline underline-offset-4 transition-colors hover:text-primary/80"
								to="/forgot-password"
							>
								Request new reset link
							</Link>
						</div>
					</div>
				) : email ? (
					<ResetPasswordForm email={email} oobCode={oobCode} />
				) : null}
			</div>
		</AuthLayout>
	);
}

function getErrorMessage(error: unknown): {
	title: string;
	description: string;
} {
	if (error instanceof Error) {
		const code = (error as { code?: string }).code;

		if (code === 'auth/expired-action-code') {
			return {
				title: 'Link expired',
				description:
					'This password reset link has expired. Please request a new one.',
			};
		}

		if (code === 'auth/invalid-action-code') {
			return {
				title: 'Invalid code',
				description:
					'This password reset code is invalid or has already been used. Please request a new one.',
			};
		}

		if (code === 'auth/user-not-found') {
			return {
				title: 'User not found',
				description:
					'This reset link is no longer valid because the user account no longer exists.',
			};
		}
	}

	return {
		title: 'Invalid or expired link',
		description:
			'This password reset link is invalid or has expired. Please request a new one.',
	};
}
