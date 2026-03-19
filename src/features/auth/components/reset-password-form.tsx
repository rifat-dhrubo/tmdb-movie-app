import { useForm } from '@tanstack/react-form';
import { useNavigate } from '@tanstack/react-router';
import React from 'react';
import { toast } from 'sonner';

import { useResetPasswordMutation } from '../hooks/use-auth-mutations';
import { RESET_PASSWORD_DEFAULT_VALUES, resetPasswordSchema } from '../schemas';

import { Icon } from '@/components/icon';
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
	email: string;
}

export function ResetPasswordForm({ email, oobCode }: ResetPasswordFormProps) {
	const resetPasswordMutation = useResetPasswordMutation();
	const navigate = useNavigate();
	const [showPassword, setShowPassword] = React.useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

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

	return (
		<form
			className="flex flex-col gap-6"
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				void form.handleSubmit();
			}}
		>
			<p className="text-center text-sm text-muted-foreground">
				Resetting password for:{' '}
				<span className="font-medium text-foreground">{email}</span>
			</p>

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
					isLoading={resetPasswordMutation.isPending}
					loadingText="Resetting..."
					type="submit"
				>
					Reset password
				</Button>
			</FieldGroup>
		</form>
	);
}
