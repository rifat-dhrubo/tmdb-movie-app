import { Link } from '@tanstack/react-router';

import { Button } from '@/components/ui/button';
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyTitle,
} from '@/components/ui/empty';

export function SearchEmpty() {
	return (
		<div className="mx-auto max-w-xl px-4 py-16">
			<Empty className="gap-8 border-0 p-0 text-center">
				<EmptyHeader className="max-w-xl gap-4">
					<EmptyTitle className="font-serif text-4xl tracking-tight md:text-5xl">
						Find a <span className="text-primary italic">film</span>
					</EmptyTitle>
					<EmptyDescription className="text-base">
						Search for movies by title, actor, or director
					</EmptyDescription>
				</EmptyHeader>
				<EmptyContent className="gap-3">
					<p className="text-sm text-muted-foreground">
						Not sure what to watch?
					</p>
					<Button asChild variant="outline">
						<Link to="/discover">Explore in Discover</Link>
					</Button>
				</EmptyContent>
			</Empty>
		</div>
	);
}
