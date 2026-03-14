import { useNavigate } from '@tanstack/react-router';
import { Loader2 } from 'lucide-react';
import React from 'react';

import { useAuth } from '@/auth';
import { Button } from '@/components/ui/button';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

interface SignUpFormProps {
	onError?: (error: string) => void;
}

export function SignUpForm({ onError }: SignUpFormProps) {
	const { signUpWithEmail } = useAuth();
	const navigate = useNavigate();

	const [name, setName] = React.useState('');
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [isLoading, setIsLoading] = React.useState(false);
	const [error, setError] = React.useState<string | null>(null);

	const handleEmailSignUp = (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		setIsLoading(true);
		signUpWithEmail(email, password)
			.then(() => navigate({ to: '/' }))
			.catch((err: unknown) => {
				const message =
					err instanceof Error ? err.message : 'Failed to create account';
				setError(message);
				onError?.(message);
			})
			.finally(() => setIsLoading(false));
	};

	return (
		<form className="flex flex-col gap-6" onSubmit={handleEmailSignUp}>
			<FieldGroup>
				{error ? (
					<div className="rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2.5 text-sm text-destructive">
						{error}
					</div>
				) : null}

				<Field>
					<FieldLabel htmlFor="name">Full name</FieldLabel>
					<Input
						required
						autoComplete="name"
						id="name"
						placeholder="Jane Doe"
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</Field>

				<Field>
					<FieldLabel htmlFor="email">Email</FieldLabel>
					<Input
						required
						autoComplete="email"
						id="email"
						placeholder="you@example.com"
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</Field>

				<Field>
					<FieldLabel htmlFor="password">Password</FieldLabel>
					<Input
						required
						autoComplete="new-password"
						id="password"
						minLength={6}
						placeholder="At least 6 characters"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</Field>

				<Field>
					<Button className="w-full" disabled={isLoading} type="submit">
						{isLoading ? <Loader2 className="size-4 animate-spin" /> : null}
						{isLoading ? 'Creating account\u2026' : 'Create account'}
					</Button>
				</Field>
			</FieldGroup>
		</form>
	);
}
