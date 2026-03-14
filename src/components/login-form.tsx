import { Link } from '@tanstack/react-router';

import { Button } from '@/components/ui/button';
import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export function LoginForm({
	className,
	...props
}: React.ComponentProps<'form'>) {
	return (
		<form className={cn('flex flex-col gap-6', className)} {...props}>
			<FieldGroup>
				<div className="flex flex-col items-center gap-1 text-center">
					<h1 className="text-2xl font-bold">Login to your account</h1>
					<p className="text-sm text-balance text-muted-foreground">
						Enter your email below to login to your account
					</p>
				</div>
				<Field>
					<FieldLabel htmlFor="email">Email</FieldLabel>
					<Input
						required
						className="bg-background"
						id="email"
						placeholder="m@example.com"
						type="email"
					/>
				</Field>
				<Field>
					<Input
						required
						className="bg-background"
						id="password"
						type="password"
					/>
				</Field>
				<Field>
					<Button type="submit">Login</Button>
				</Field>
				<Field>
					<FieldDescription className="text-center">
						Don&apos;t have an account?{' '}
						<Button asChild variant="link">
							<Link to="/sign-up">Sign up</Link>
						</Button>
					</FieldDescription>
				</Field>
			</FieldGroup>
		</form>
	);
}
