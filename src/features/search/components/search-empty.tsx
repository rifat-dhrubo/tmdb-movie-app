import { Link } from '@tanstack/react-router';

import { Icon } from '@/components/icon';
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
						Search for movies by title
					</EmptyDescription>
				</EmptyHeader>
				<EmptyContent className="gap-3">
					<p className="text-sm text-muted-foreground">
						Not sure what to watch?
					</p>
					<Button
						asChild
						className="group/btn relative gap-2"
						variant="outline"
					>
						<Link to="/discover">
							<span className="relative">
								Explore in Discover
								<span className="absolute -bottom-0.5 left-0 h-0.5 w-full origin-right scale-x-0 bg-primary transition-transform duration-200 group-hover/btn:origin-left group-hover/btn:scale-x-100" />
							</span>
							<Icon
								className="size-3 transition-transform duration-200 group-hover/btn:translate-x-1"
								name="arrow_right_bold"
							/>
						</Link>
					</Button>
				</EmptyContent>
			</Empty>
		</div>
	);
}
