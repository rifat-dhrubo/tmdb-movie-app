import { Link } from '@tanstack/react-router';

import { Icon } from '@/components/icon';
import { Button } from '@/components/ui/button';
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from '@/components/ui/empty';

interface SearchResultsListErrorProps {
	onRetry: () => void;
}

export function SearchResultsListError({
	onRetry,
}: SearchResultsListErrorProps) {
	return (
		<div className="mx-auto mt-16 max-w-md text-center">
			<Empty className="border border-dashed border-destructive/30">
				<EmptyHeader>
					<EmptyMedia variant="icon">
						<Icon className="text-destructive" name="warning_circle_bold" />
					</EmptyMedia>
					<EmptyTitle className="font-serif text-2xl tracking-tight">
						Something went wrong
					</EmptyTitle>
					<EmptyDescription>
						We couldn&apos;t reach the film database. Check your connection and
						try again.
					</EmptyDescription>
				</EmptyHeader>
				<EmptyContent className="flex-row justify-center">
					<Button type="button" onClick={onRetry}>
						Try again
					</Button>
					<Button asChild type="button" variant="outline">
						<Link to="/">Go home</Link>
					</Button>
				</EmptyContent>
			</Empty>
		</div>
	);
}
