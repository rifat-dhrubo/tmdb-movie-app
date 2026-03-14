import { z } from 'zod';

export const signInSchema = z.object({
	email: z.email('Please enter a valid email'),
	password: z
		.string()
		.min(1, 'Password is required')
		.min(6, 'Password must be at least 6 characters'),
});

export type SignInSchema = z.infer<typeof signInSchema>;

export const SIGN_IN_DEFAULT_VALUES: SignInSchema = {
	email: '',
	password: '',
};

export const signUpSchema = z
	.object({
		email: z.email('Please enter a valid email'),
		password: z
			.string()
			.min(1, 'Password is required')
			.min(6, 'Password must be at least 6 characters'),
		confirmPassword: z.string().min(1, 'Please confirm your password'),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Passwords do not match',
		path: ['confirmPassword'],
	});

export const SIGN_UP_DEFAULT_VALUES: SignUpSchema = {
	email: '',
	password: '',
	confirmPassword: '',
};

export type SignUpSchema = z.infer<typeof signUpSchema>;

export const forgotPasswordSchema = z.object({
	email: z.email('Please enter a valid email'),
});

export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;

export const FORGOT_PASSWORD_DEFAULT_VALUES: ForgotPasswordSchema = {
	email: '',
};

export const resetPasswordSchema = z
	.object({
		password: z
			.string()
			.min(1, 'Password is required')
			.min(6, 'Password must be at least 6 characters'),
		confirmPassword: z.string().min(1, 'Please confirm your password'),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Passwords do not match',
		path: ['confirmPassword'],
	});

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;

export const RESET_PASSWORD_DEFAULT_VALUES: ResetPasswordSchema = {
	password: '',
	confirmPassword: '',
};
