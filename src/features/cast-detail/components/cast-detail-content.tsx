import { CastDetailCrewWork } from './cast-detail-crew-work';
import { CastDetailError } from './cast-detail-error';
import { CastDetailFilmography } from './cast-detail-filmography';
import { CastDetailHero } from './cast-detail-hero';
import { CastDetailSkeleton } from './cast-detail-skeleton';

import { Spacer } from '@/components/spacer';
import {
	usePersonDetailsSuspense,
	usePersonMovieCredits,
} from '@/generated/tmdb/default/default';

interface CastDetailContentProps {
	castId: number;
}

export function CastDetailContent({ castId }: CastDetailContentProps) {
	const { data: person } = usePersonDetailsSuspense(castId);

	const {
		data: credits,
		isError: isCreditsError,
		isLoading: isCreditsLoading,
		refetch: refetchCredits,
	} = usePersonMovieCredits(castId, {});

	return (
		<div className="animate-in duration-700 fade-in slide-in-from-bottom-4">
			<CastDetailHero person={person} />

			<div className="container mx-auto px-4">
				<Spacer size={24} />

				<section className="border-t border-border pt-6">
					{isCreditsLoading ? <CastDetailSkeleton /> : null}
					{isCreditsError ? (
						<CastDetailError
							message="Failed to load filmography information."
							title="Filmography"
							onRetry={() => void refetchCredits()}
						/>
					) : null}
					{credits?.cast && credits.cast.length > 0 ? (
						<CastDetailFilmography cast={credits.cast} />
					) : null}
				</section>

				<Spacer size={24} />

				<section className="border-t border-border pt-6">
					{isCreditsLoading ? null : null}
					{isCreditsError ? (
						<CastDetailError
							message="Failed to load crew credits."
							title="Behind the Camera"
							onRetry={() => void refetchCredits()}
						/>
					) : null}
					{credits?.crew && credits.crew.length > 0 ? (
						<CastDetailCrewWork crew={credits.crew} />
					) : null}
				</section>
			</div>
		</div>
	);
}
