import React from 'react';

import { Icon } from '@/components/icon';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import type { GenreMovieList200GenresItem } from '@/generated/tmdb/tmdbApi.schemas';
import { cn } from '@/lib/utils';

interface DiscoverFilterBarGenreFilterPopoverProps {
	genres: Array<GenreMovieList200GenresItem>;
	selectedGenres: Array<number>;
	onChange: (selectedIds: Array<number>) => void;
}

function isSelected(
	selectedGenres: Array<number>,
	genreId: number | undefined,
): boolean {
	if (genreId === undefined) return false;
	return selectedGenres.includes(genreId);
}

export function DiscoverFilterBarGenreFilterPopover({
	genres,
	onChange,
	selectedGenres,
}: DiscoverFilterBarGenreFilterPopoverProps) {
	const [open, setOpen] = React.useState(false);

	const toggleGenre = (genreId: number | undefined) => {
		if (genreId === undefined) return;
		if (selectedGenres.includes(genreId)) {
			onChange(selectedGenres.filter((id) => id !== genreId));
		} else {
			onChange([...selectedGenres, genreId]);
		}
	};

	const clearGenres = () => {
		onChange([]);
	};

	const selectedGenreNames = genres
		.filter((g) => g.id !== undefined && selectedGenres.includes(g.id))
		.map((g) => g.name)
		.filter((name): name is string => name !== undefined);

	const hasSelection = selectedGenres.length > 0;

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					className={cn(
						'h-9 gap-2 px-3 font-normal',
						hasSelection && 'border-primary/30 text-primary',
					)}
				>
					<Icon className="size-4" name="list_bold" />
					<span>Genre</span>
					{hasSelection ? (
						<Badge
							className="ml-1 h-5 min-w-5 px-1.5 text-xs"
							variant="secondary"
						>
							{selectedGenres.length}
						</Badge>
					) : null}
				</Button>
			</PopoverTrigger>
			<PopoverContent align="start" className="w-72 p-0">
				<div className="border-b p-3">
					<div className="flex items-center justify-between">
						<h4 className="font-serif text-sm font-normal">Select genres</h4>
						{hasSelection ? (
							<Button
								className="h-auto px-2 py-1 text-xs"
								variant="ghost"
								onClick={clearGenres}
							>
								Clear
							</Button>
						) : null}
					</div>
					{selectedGenreNames.length > 0 ? (
						<p className="mt-1 text-xs text-muted-foreground">
							{selectedGenreNames.join(', ')}
						</p>
					) : null}
				</div>
				<div className="max-h-64 overflow-y-auto p-2">
					<div className="grid grid-cols-1 gap-1">
						{genres.map((genre, index) => (
							<button
								key={genre.id ?? `genre-${index}`}
								type="button"
								className={cn(
									'flex items-center justify-between rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-accent',
									isSelected(selectedGenres, genre.id) &&
										'bg-accent text-accent-foreground',
								)}
								onClick={() => toggleGenre(genre.id)}
							>
								<span>{genre.name}</span>
								{isSelected(selectedGenres, genre.id) ? (
									<Icon className="size-4" name="check_bold" />
								) : null}
							</button>
						))}
					</div>
				</div>
			</PopoverContent>
		</Popover>
	);
}
