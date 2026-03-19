import { Spacer } from '@/components/spacer';
import type { PersonMovieCredits200CrewItem } from '@/generated/tmdb/tmdbApi.schemas';
import { buildTmdbImageUrl } from '@/lib/tmdb/image-config';

interface CastDetailCrewWorkProps {
	crew: Array<PersonMovieCredits200CrewItem>;
}

const DEPARTMENT_ORDER = ['Directing', 'Writing', 'Production'];

export function CastDetailCrewWork({ crew }: CastDetailCrewWorkProps) {
	if (crew.length === 0) return null;

	// Group by department
	const groupedByDept = crew.reduce<
		Record<string, Array<PersonMovieCredits200CrewItem>>
	>((acc, item) => {
		const dept = item.department ?? 'Other';
		acc[dept] ??= [];
		acc[dept].push(item);
		return acc;
	}, {});

	// Sort departments by priority
	const sortedDepts = Object.keys(groupedByDept).sort((a, b) => {
		const indexA = DEPARTMENT_ORDER.indexOf(a);
		const indexB = DEPARTMENT_ORDER.indexOf(b);
		if (indexA === -1 && indexB === -1) return a.localeCompare(b);
		if (indexA === -1) return 1;
		if (indexB === -1) return -1;
		return indexA - indexB;
	});

	return (
		<div>
			<div className="flex items-center justify-between">
				<h2 className="font-serif text-2xl tracking-tight text-foreground md:text-3xl">
					Behind the Camera
				</h2>
			</div>

			<Spacer size={16} />

			<div className="space-y-8">
				{sortedDepts.map((department) => {
					const items = groupedByDept[department];
					// Sort by release date
					const sortedItems = [...items].sort((a, b) => {
						const dateA = a.release_date
							? new Date(a.release_date).getTime()
							: 0;
						const dateB = b.release_date
							? new Date(b.release_date).getTime()
							: 0;
						return dateB - dateA;
					});

					return (
						<div key={department}>
							<h3 className="mb-4 text-sm font-medium tracking-wider text-muted-foreground uppercase">
								{department}
							</h3>
							<div className="scrollbar-hide flex gap-4 overflow-x-auto pb-4">
								{sortedItems.map((movie) => (
									<CrewCard key={movie.credit_id} movie={movie} />
								))}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

interface CrewCardProps {
	movie: PersonMovieCredits200CrewItem;
}

function CrewCard({ movie }: CrewCardProps) {
	const imageUrl = buildTmdbImageUrl({
		path: movie.poster_path ?? null,
		size: 'w342',
		type: 'poster',
	});

	const year = movie.release_date
		? new Date(movie.release_date).getFullYear()
		: null;

	return (
		<div className="group shrink-0">
			<div className="relative w-32 overflow-hidden rounded-sm bg-muted md:w-36">
				<div className="aspect-[2/3] overflow-hidden">
					{imageUrl ? (
						<img
							alt={movie.title}
							className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
							loading="lazy"
							src={imageUrl}
						/>
					) : (
						<div className="flex h-full w-full items-center justify-center bg-foreground">
							<span className="px-2 text-center font-serif text-sm text-background">
								{movie.title}
							</span>
						</div>
					)}
				</div>

				{movie.job ? (
					<div className="absolute top-2 right-2">
						<span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-medium text-primary-foreground">
							{movie.job}
						</span>
					</div>
				) : null}
			</div>

			<div className="mt-2 w-32 md:w-36">
				<p className="line-clamp-1 text-sm font-medium text-foreground">
					{movie.title}
				</p>
				{year ? <p className="text-xs text-muted-foreground">{year}</p> : null}
			</div>
		</div>
	);
}
