import { Link, useNavigate } from '@tanstack/react-router';
import { Loader2 } from 'lucide-react';
import React from 'react';

import { useAuth } from '@/auth';
import { Button } from '@/components/ui/button';
import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';

export function SignInForm() {
	const { signInWithEmail } = useAuth();
	const navigate = useNavigate();

	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [isLoading, setIsLoading] = React.useState(false);
	const [error, setError] = React.useState<string | null>(null);

	const handleEmailSignIn = (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		setIsLoading(true);
		signInWithEmail(email, password)
			.then(() => navigate({ to: '/' }))
			.catch((err: unknown) => {
				setError(err instanceof Error ? err.message : 'Failed to sign in');
			})
			.finally(() => setIsLoading(false));
	};

	return (
		<form className="flex flex-col gap-6" onSubmit={handleEmailSignIn}>
			<FieldGroup>
				<div className="flex flex-col items-center gap-1 text-center">
					<h1 className="font-serif text-2xl font-bold">Welcome back</h1>
					<p className="text-sm text-balance text-muted-foreground">
						Sign in to your account
					</p>
				</div>

				{error ? (
					<div className="rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2.5 text-sm text-destructive">
						{error}
					</div>
				) : null}

				<Field>
					<FieldLabel htmlFor="email">Email</FieldLabel>
					<Input
						required
						autoComplete="email"
						className="bg-background"
						id="email"
						placeholder="you@example.com"
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</Field>

				<Field>
					<div className="flex items-center">
						<FieldLabel htmlFor="password">Password</FieldLabel>
						<button
							className="ml-auto text-xs text-muted-foreground underline-offset-4 transition-colors hover:text-primary hover:underline"
							type="button"
						>
							Forgot password?
						</button>
					</div>
					<Input
						required
						autoComplete="current-password"
						className="bg-background"
						id="password"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</Field>

				<Field>
					<Button className="w-full" disabled={isLoading} type="submit">
						{isLoading ? <Loader2 className="size-4 animate-spin" /> : null}
						{isLoading ? 'Signing in\u2026' : 'Sign in'}
					</Button>
				</Field>

				<Field>
					<FieldDescription className="text-center">
						Don&apos;t have an account?{' '}
						<Link className="underline underline-offset-4" to="/sign-up">
							Sign up
						</Link>
					</FieldDescription>
				</Field>
			</FieldGroup>
		</form>
	);
}
