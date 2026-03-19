import { Link } from '@tanstack/react-router';

import { Spacer } from '@/components/spacer';
import type { MovieCredits200CastItem } from '@/generated/tmdb/tmdbApi.schemas';
import { buildTmdbImageUrl } from '@/lib/tmdb/image-config';

interface MovieDetailCastProps {
	cast: Array<MovieCredits200CastItem>;
}

function getInitials(name: string): string {
	const parts = name.split(' ');
	if (parts.length >= 2) {
		return `${parts[0]?.[0] ?? ''}${parts[parts.length - 1]?.[0] ?? ''}`;
	}
	return name.slice(0, 2).toUpperCase();
}

export function MovieDetailCast({ cast }: MovieDetailCastProps) {
	if (cast.length === 0) return null;

	return (
		<div>
			<div className="flex items-center justify-between">
				<h2 className="font-serif text-2xl tracking-tight text-foreground md:text-3xl">
					Cast
				</h2>
			</div>

			<Spacer size={12}></Spacer>

			<div className="scrollbar-hide flex gap-4 overflow-x-auto pb-4">
				{cast.map((person) => (
					<CastMember key={person.id} person={person} />
				))}
			</div>
			<Spacer size={12}></Spacer>
		</div>
	);
}

interface CastMemberProps {
	person: MovieCredits200CastItem;
}

function CastMember({ person }: CastMemberProps) {
	const imageUrl = buildTmdbImageUrl({
		path: person.profile_path ?? null,
		size: 'w185',
		type: 'profile',
	});

	const initials = getInitials(person.name ?? '');
	const castId = person.id ?? 0;

	return (
		<Link
			className="group shrink-0 cursor-pointer"
			params={{ castId }}
			to="/cast/$castId"
		>
			<div className="relative size-16 overflow-hidden rounded-full bg-muted md:size-20">
				{imageUrl ? (
					<img
						alt={person.name}
						className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
						loading="lazy"
						src={imageUrl}
					/>
				) : (
					<div className="flex h-full w-full items-center justify-center bg-foreground">
						<span className="font-serif text-sm font-medium text-background md:text-base">
							{initials}
						</span>
					</div>
				)}
			</div>
			<div className="mt-2 w-16 text-center md:w-20">
				<p className="truncate text-xs font-medium text-foreground group-hover:text-primary">
					{person.name}
				</p>
				{person.character ? (
					<p className="truncate text-[10px] text-muted-foreground">
						{person.character}
					</p>
				) : null}
			</div>
		</Link>
	);
}
