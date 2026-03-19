import { buildTmdbImageUrl } from '@/lib/tmdb/image-config';

interface CastDetailHeroPhotoProps {
	profilePath: string | null;
	name: string;
}

function getInitials(name: string): string {
	const parts = name.split(' ');
	if (parts.length >= 2) {
		return `${parts[0]?.[0] ?? ''}${parts[parts.length - 1]?.[0] ?? ''}`;
	}
	return name.slice(0, 2).toUpperCase();
}

export function CastDetailHeroPhoto({
	name,
	profilePath,
}: CastDetailHeroPhotoProps) {
	const imageUrl = buildTmdbImageUrl({
		path: profilePath,
		size: 'h632',
		type: 'profile',
	});

	const initials = getInitials(name);

	return (
		<div className="mx-auto shrink-0 lg:mx-0">
			<div className="group relative size-48 overflow-hidden rounded-full bg-muted md:size-56 lg:size-64">
				{imageUrl ? (
					<img
						alt={name}
						className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
						loading="eager"
						src={imageUrl}
					/>
				) : (
					<div className="flex h-full w-full items-center justify-center bg-foreground">
						<span className="font-serif text-3xl font-medium text-background md:text-4xl">
							{initials}
						</span>
					</div>
				)}
			</div>
		</div>
	);
}
