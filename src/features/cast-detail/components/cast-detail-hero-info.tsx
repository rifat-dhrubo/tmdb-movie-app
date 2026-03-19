import React from 'react';

import { Icon } from '@/components/icon';
import { Spacer } from '@/components/spacer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { PersonDetails200 } from '@/generated/tmdb/tmdbApi.schemas';
import { cn } from '@/lib/utils';

interface CastDetailHeroInfoProps {
	person: PersonDetails200;
}

export function CastDetailHeroInfo({ person }: CastDetailHeroInfoProps) {
	const [isBioExpanded, setIsBioExpanded] = React.useState(false);

	const knownAs = person.also_known_as ?? [];
	const displayKnownAs = knownAs.slice(0, 3);
	const remainingKnownAs = knownAs.length - 3;

	const stats = [
		{
			label: 'Born',
			value: person.birthday
				? new Date(person.birthday).toLocaleDateString('en-US', {
						year: 'numeric',
						month: 'long',
						day: 'numeric',
					})
				: '-',
		},
		{
			label: 'Birthplace',
			value: person.place_of_birth ?? '-',
		},
		{
			label: 'Department',
			value: person.known_for_department ?? '-',
		},
		{
			label: 'Popularity',
			value: person.popularity ? Math.round(person.popularity).toString() : '-',
		},
	];

	const biography = person.biography ?? '';
	const shouldTruncate = biography.length > 300;
	const displayBio = isBioExpanded
		? biography
		: shouldTruncate
			? `${biography.slice(0, 300)}...`
			: biography;

	const hasHomepage = person.homepage && typeof person.homepage === 'string';
	const hasImdb = person.imdb_id && typeof person.imdb_id === 'string';

	return (
		<div className="text-left lg:text-left">
			<Badge className="text-xs" variant="secondary">
				<span className="mr-1.5 inline-block size-1.5 rounded-full bg-primary" />
				{person.known_for_department ?? 'Person'}
			</Badge>

			<Spacer size={12} />

			<h1 className="text-left font-serif text-3xl leading-tight font-normal tracking-tight text-foreground md:text-4xl lg:text-5xl">
				{person.name}
			</h1>

			<Spacer size={12} />

			{knownAs.length > 0 ? (
				<div className="flex flex-wrap items-center justify-start gap-2 lg:justify-start">
					{displayKnownAs.map((name) => (
						<span
							key={name}
							className="rounded-full border border-border/60 bg-background px-3 py-1 text-xs text-muted-foreground"
						>
							{name}
						</span>
					))}
					{remainingKnownAs > 0 ? (
						<span className="text-xs text-muted-foreground">
							+{remainingKnownAs} more
						</span>
					) : null}
				</div>
			) : null}

			<Spacer size={16} />

			{biography ? (
				<div className="mx-auto max-w-2xl text-left lg:mx-0">
					<p
						className={cn(
							'text-base leading-relaxed text-foreground/80',
							!isBioExpanded && 'line-clamp-4',
						)}
					>
						{displayBio}
					</p>
					{shouldTruncate ? (
						<button
							className="mt-2 text-sm text-primary hover:underline"
							type="button"
							onClick={() => setIsBioExpanded(!isBioExpanded)}
						>
							{isBioExpanded ? 'Show less' : 'Read more'}
						</button>
					) : null}
				</div>
			) : null}

			<Spacer size={24} />

			<div className="flex flex-wrap justify-start gap-3 lg:justify-start">
				{hasImdb ? (
					<Button asChild size="lg" variant="outline">
						<a
							href={`https://www.imdb.com/name/${person.imdb_id}`}
							rel="noopener noreferrer"
							target="_blank"
						>
							<Icon className="mr-2 size-4" name="arrow_square_out" />
							IMDb
						</a>
					</Button>
				) : null}

				{hasHomepage ? (
					<Button asChild size="lg" variant="outline">
						<a
							href={person.homepage as string}
							rel="noopener noreferrer"
							target="_blank"
						>
							<Icon className="mr-2 size-4" name="arrow_square_out" />
							Website
						</a>
					</Button>
				) : null}
			</div>

			<Spacer size={24} />

			<div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
				{stats.map((stat) => (
					<div
						key={stat.label}
						className="flex flex-col items-center justify-center rounded-sm bg-foreground px-2 py-3 text-center"
					>
						<span className="text-xs text-background/70">{stat.label}</span>
						<span className="mt-1 text-sm font-medium text-background md:text-base">
							{stat.value}
						</span>
					</div>
				))}
			</div>
		</div>
	);
}
