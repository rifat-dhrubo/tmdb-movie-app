import { CastDetailHeroInfo } from './cast-detail-hero-info';
import { CastDetailHeroPhoto } from './cast-detail-hero-photo';

import type { PersonDetails200 } from '@/generated/tmdb/tmdbApi.schemas';

interface CastDetailHeroProps {
	person: PersonDetails200;
}

export function CastDetailHero({ person }: CastDetailHeroProps) {
	return (
		<section className="relative min-h-[50vh] overflow-hidden bg-background">
			<div className="relative container mx-auto px-4 py-8 md:py-16">
				<div className="grid items-start gap-8 lg:grid-cols-[280px_1fr] lg:gap-16">
					<CastDetailHeroPhoto
						name={person.name ?? ''}
						profilePath={person.profile_path ?? null}
					/>

					<CastDetailHeroInfo person={person} />
				</div>
			</div>
		</section>
	);
}
