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
