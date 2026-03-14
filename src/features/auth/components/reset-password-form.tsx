import { useForm } from '@tanstack/react-form';
import { Link, useNavigate } from '@tanstack/react-router';
import React from 'react';
import { toast } from 'sonner';

import {
	useResetPasswordMutation,
	useVerifyResetCode,
} from '../hooks/use-auth-mutations';
import { RESET_PASSWORD_DEFAULT_VALUES, resetPasswordSchema } from '../schemas';

import { Icon } from '@/components/icon';
import { Spacer } from '@/components/spacer';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from '@/components/ui/field';
import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
} from '@/components/ui/input-group';

interface ResetPasswordFormProps {
	oobCode: string;
}

export function ResetPasswordForm({ oobCode }: ResetPasswordFormProps) {
	const resetPasswordMutation = useResetPasswordMutation();
	const verifyResetCode = useVerifyResetCode();
	const navigate = useNavigate();
	const [showPassword, setShowPassword] = React.useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
	const [isVerified, setIsVerified] = React.useState(false);
	const [verificationError, setVerificationError] = React.useState<
		string | null
	>(null);

	React.useEffect(() => {
		verifyResetCode.mutate(oobCode, {
			onSuccess: () => {
				setIsVerified(true);
			},
			onError: (err: unknown) => {
				const message =
					err instanceof Error ? err.message : 'Invalid or expired reset link';
				setVerificationError(message);
			},
		});
	}, [oobCode, verifyResetCode]);

	const form = useForm({
		defaultValues: RESET_PASSWORD_DEFAULT_VALUES,
		validators: {
			onSubmit: resetPasswordSchema,
		},
		onSubmit: ({ value }) => {
			toast.promise(
				resetPasswordMutation.mutateAsync({
					code: oobCode,
					password: value.password,
				}),
				{
					loading: 'Resetting password...',
					success: () => {
						void navigate({ to: '/sign-in' });
						return 'Password reset successfully. Please sign in with your new password.';
					},
					error: (err: unknown) => {
						const message =
							err instanceof Error ? err.message : 'Failed to reset password';
						return message;
					},
				},
			);
		},
	});

	if (verifyResetCode.isPending) {
		return (
			<div className="flex flex-col items-center justify-center gap-4 py-8">
				<Icon
					className="size-8 animate-spin text-muted-foreground"
					name="spinner_bold"
				/>
				<p className="text-sm text-muted-foreground">Verifying reset link...</p>
			</div>
		);
	}

	if (verificationError) {
		return (
			<Alert variant="destructive">
				<Icon className="size-4" name="warning_bold" />
				<AlertTitle>Invalid or expired link</AlertTitle>
				<AlertDescription>
					This password reset link is invalid or has expired. Please request a
					new one.
					<Spacer size={16} />
					<Link className="underline underline-offset-4" to="/forgot-password">
						Request new reset link
					</Link>
				</AlertDescription>
			</Alert>
		);
	}

	if (!isVerified) {
		return null;
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
				<form.Field name="password">
					{(field) => {
						const isInvalid =
							field.state.meta.isTouched && !field.state.meta.isValid;
						return (
							<Field data-invalid={isInvalid}>
								<FieldLabel htmlFor={field.name}>New password</FieldLabel>
								<InputGroup>
									<InputGroupInput
										aria-invalid={isInvalid}
										autoComplete="new-password"
										id={field.name}
										name={field.name}
										type={showPassword ? 'text' : 'password'}
										value={field.state.value}
										onBlur={field.handleBlur}
										onChange={(e) => field.handleChange(e.target.value)}
									/>
									<InputGroupAddon align="inline-end">
										<InputGroupButton
											size="icon-xs"
											type="button"
											variant="ghost"
											onClick={() => setShowPassword(!showPassword)}
										>
											{showPassword ? (
												<Icon className="size-4" name="eye_closed_bold" />
											) : (
												<Icon className="size-4" name="eye_bold" />
											)}
										</InputGroupButton>
									</InputGroupAddon>
								</InputGroup>
								{isInvalid ? (
									<FieldError errors={field.state.meta.errors} />
								) : null}
							</Field>
						);
					}}
				</form.Field>

				<form.Field name="confirmPassword">
					{(field) => {
						const isInvalid =
							field.state.meta.isTouched && !field.state.meta.isValid;
						return (
							<Field data-invalid={isInvalid}>
								<FieldLabel htmlFor={field.name}>Confirm password</FieldLabel>
								<InputGroup>
									<InputGroupInput
										aria-invalid={isInvalid}
										autoComplete="new-password"
										id={field.name}
										name={field.name}
										type={showConfirmPassword ? 'text' : 'password'}
										value={field.state.value}
										onBlur={field.handleBlur}
										onChange={(e) => field.handleChange(e.target.value)}
									/>
									<InputGroupAddon align="inline-end">
										<InputGroupButton
											size="icon-xs"
											type="button"
											variant="ghost"
											onClick={() =>
												setShowConfirmPassword(!showConfirmPassword)
											}
										>
											{showConfirmPassword ? (
												<Icon className="size-4" name="eye_closed_bold" />
											) : (
												<Icon className="size-4" name="eye_bold" />
											)}
										</InputGroupButton>
									</InputGroupAddon>
								</InputGroup>
								{isInvalid ? (
									<FieldError errors={field.state.meta.errors} />
								) : null}
							</Field>
						);
					}}
				</form.Field>

				<Button
					className="w-full"
					disabled={resetPasswordMutation.isPending}
					type="submit"
				>
					{resetPasswordMutation.isPending ? (
						<Icon className="size-4 animate-spin" name="spinner_bold" />
					) : null}
					{resetPasswordMutation.isPending ? 'Resetting...' : 'Reset password'}
				</Button>
			</FieldGroup>
		</form>
	);
}
