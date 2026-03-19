import { Icon } from '@/components/icon';
import { Button } from '@/components/ui/button';

interface MovieErrorProps {
	onRetry: () => void;
}

export function MovieDetailError({ onRetry }: MovieErrorProps) {
	return (
		<div className="container mx-auto px-4 py-24">
			<div className="mx-auto max-w-md text-center">
				<div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
					<Icon className="size-8 text-destructive" name="warning_bold" />
				</div>

				<h2 className="mt-6 font-serif text-2xl tracking-tight">
					Unable to load movie
				</h2>

				<p className="mt-2 text-muted-foreground">
					We couldn&apos;t fetch the movie details. Please try again.
				</p>

				<Button className="mt-6" onClick={onRetry}>
					Try again
				</Button>
			</div>
		</div>
	);
}
