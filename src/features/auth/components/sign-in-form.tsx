import { useForm } from '@tanstack/react-form';
import { useNavigate } from '@tanstack/react-router';
import React from 'react';
import { toast } from 'sonner';

import { useSignInMutation } from '../hooks/use-auth-mutations';
import { SIGN_IN_DEFAULT_VALUES, signInSchema } from '../schemas';

import { Icon } from '@/components/icon';
import { Button } from '@/components/ui/button';
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
} from '@/components/ui/input-group';

interface SignInFormProps {
	onError?: (error: string) => void;
}

export function SignInForm({ onError }: SignInFormProps) {
	const signInMutation = useSignInMutation();
	const navigate = useNavigate();
	const [showPassword, setShowPassword] = React.useState(false);

	const form = useForm({
		defaultValues: SIGN_IN_DEFAULT_VALUES,
		validators: {
			onSubmit: signInSchema,
		},
		onSubmit: ({ value }) => {
			toast.promise(signInMutation.mutateAsync(value), {
				loading: 'Signing in...',
				success: () => {
					void navigate({ to: '/' });
					return 'Signed in successfully';
				},
				error: (err: unknown) => {
					const message =
						err instanceof Error ? err.message : 'Failed to sign in';
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
								<div className="flex items-center">
									<FieldLabel htmlFor={field.name}>Password</FieldLabel>
								</div>
								<InputGroup>
									<InputGroupInput
										aria-invalid={isInvalid}
										autoComplete="current-password"
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

				<Button
					className="w-full"
					disabled={signInMutation.isPending}
					type="submit"
				>
					{signInMutation.isPending ? (
						<Icon className="size-4 animate-spin" name="spinner_bold" />
					) : null}
					{signInMutation.isPending ? 'Signing in\u2026' : 'Sign in'}
				</Button>
			</FieldGroup>
		</form>
	);
}
