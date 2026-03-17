import { useForm } from '@tanstack/react-form';
import React from 'react';
import { toast } from 'sonner';

import { useForgotPasswordMutation } from '../hooks/use-auth-mutations';
import {
	FORGOT_PASSWORD_DEFAULT_VALUES,
	forgotPasswordSchema,
} from '../schemas';

import { Icon } from '@/components/icon';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';

interface ForgotPasswordFormProps {
	onError?: (error: string) => void;
}

export function ForgotPasswordForm({ onError }: ForgotPasswordFormProps) {
	const forgotPasswordMutation = useForgotPasswordMutation();
	const [isSuccess, setIsSuccess] = React.useState(false);

	const form = useForm({
		defaultValues: FORGOT_PASSWORD_DEFAULT_VALUES,
		validators: {
			onSubmit: forgotPasswordSchema,
		},
		onSubmit: ({ value }) => {
			toast.promise(forgotPasswordMutation.mutateAsync(value.email), {
				loading: 'Sending reset email...',
				success: () => {
					setIsSuccess(true);
					return 'Check your email for reset instructions';
				},
				error: (err: unknown) => {
					const message =
						err instanceof Error ? err.message : 'Failed to send reset email';
					onError?.(message);
					return message;
				},
			});
		},
	});

	if (isSuccess) {
		return (
			<Alert className="border-success/20 bg-card text-success-foreground">
				<Icon className="size-4" name="check_circle_bold" />
				<AlertTitle>Check your email</AlertTitle>
				<AlertDescription>
					We&apos;ve sent you a link to reset your password. The link will
					expire in 1 hour.
				</AlertDescription>
			</Alert>
		);
	}

	return (
		<form
			className="flex flex-col gap-6"
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				void form.handleSubmit();
			}}
		>
			<FieldGroup>
				<form.Field name="email">
					{(field) => {
						const isInvalid =
							field.state.meta.isTouched && !field.state.meta.isValid;
						return (
							<Field data-invalid={isInvalid}>
								<FieldLabel htmlFor={field.name}>Email</FieldLabel>
								<Input
									aria-invalid={isInvalid}
									autoComplete="email"
									id={field.name}
									name={field.name}
									placeholder="you@example.com"
									type="email"
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.value)}
								/>
								{isInvalid ? (
									<FieldError errors={field.state.meta.errors} />
								) : null}
								<p className="text-xs text-muted-foreground">
									Enter the email address associated with your account and
									we&apos;ll send you a link to reset your password.
								</p>
							</Field>
						);
					}}
				</form.Field>

				<Button
					className="w-full"
					disabled={forgotPasswordMutation.isPending}
					type="submit"
				>
					{forgotPasswordMutation.isPending ? (
						<Icon className="size-4 animate-spin" name="spinner_bold" />
					) : null}
					{forgotPasswordMutation.isPending ? 'Sending...' : 'Send reset link'}
				</Button>
			</FieldGroup>
		</form>
	);
}
