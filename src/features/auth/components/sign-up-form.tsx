import { useForm } from '@tanstack/react-form';
import { useNavigate } from '@tanstack/react-router';
import React from 'react';
import { toast } from 'sonner';

import { useSignUpMutation } from '../hooks/use-auth-mutations';
import { SIGN_UP_DEFAULT_VALUES, signUpSchema } from '../schemas';

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

interface SignUpFormProps {
	onError?: (error: string) => void;
}

export function SignUpForm({ onError }: SignUpFormProps) {
	const signUpMutation = useSignUpMutation();
	const navigate = useNavigate();
	const [showPassword, setShowPassword] = React.useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

	const form = useForm({
		defaultValues: SIGN_UP_DEFAULT_VALUES,
		validators: {
			onSubmit: signUpSchema,
		},
		onSubmit: ({ value }) => {
			const { email, password } = value;
			toast.promise(signUpMutation.mutateAsync({ email, password }), {
				loading: 'Creating account...',
				success: () => {
					void navigate({ to: '/' });
					return 'Account created successfully';
				},
				error: (err: unknown) => {
					const message =
						err instanceof Error ? err.message : 'Failed to create account';
					onError?.(message);
					return message;
				},
			});
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
			<FieldGroup>
				<form.Field name="email">
					{(field) => {
						const isInvalid =
							field.state.meta.isTouched && !field.state.meta.isValid;
						return (
							<Field data-invalid={isInvalid}>
								<FieldLabel htmlFor={field.name}>Email</FieldLabel>
								<InputGroup>
									<InputGroupInput
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
								</InputGroup>
								{isInvalid ? (
									<FieldError errors={field.state.meta.errors} />
								) : null}
							</Field>
						);
					}}
				</form.Field>

				<form.Field name="password">
					{(field) => {
						const isInvalid =
							field.state.meta.isTouched && !field.state.meta.isValid;
						return (
							<Field data-invalid={isInvalid}>
								<FieldLabel htmlFor={field.name}>Password</FieldLabel>
								<InputGroup>
									<InputGroupInput
										aria-invalid={isInvalid}
										autoComplete="new-password"
										id={field.name}
										name={field.name}
										placeholder="At least 6 characters"
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
										placeholder="Re-enter your password"
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
					disabled={signUpMutation.isPending}
					type="submit"
				>
					{signUpMutation.isPending ? (
						<Icon className="size-4 animate-spin" name="spinner_bold" />
					) : null}
					{signUpMutation.isPending
						? 'Creating account\u2026'
						: 'Create account'}
				</Button>
			</FieldGroup>
		</form>
	);
}
