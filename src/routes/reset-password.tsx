import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';

import { Spacer } from '@/components/spacer';
import { AuthLayout, ResetPasswordForm } from '@/features/auth';

const searchSchema = z.object({
	oobCode: z.string(),
});

export const Route = createFileRoute('/reset-password')({
	component: ResetPasswordPage,
	validateSearch: searchSchema,
});

function ResetPasswordPage() {
	const { oobCode } = Route.useSearch();

	return (
		<AuthLayout
			quote={{
				text: 'A fresh start is just a few clicks away.',
				attribution: 'Create a new password to continue',
			}}
		>
			<h1 className="text-center font-serif text-4xl font-bold">
				Reset password
			</h1>
			<Spacer size={6}></Spacer>
			<p className="text-center text-base text-balance text-muted-foreground">
				Enter your new password below
			</p>

			<Spacer size={8}></Spacer>

			<ResetPasswordForm oobCode={oobCode} />
		</AuthLayout>
	);
}
