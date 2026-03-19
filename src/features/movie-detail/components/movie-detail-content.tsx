import { MovieDetailCast } from './movie-detail-cast';
import { MovieDetailCastSkeleton } from './movie-detail-cast-skeleton';
import { MovieDetailHero } from './movie-detail-hero';
import { MovieDetailRecommendations } from './movie-detail-recommendations';
import { MovieDetailSectionError } from './movie-detail-section-error';
import { MovieDetailTechnical } from './movie-detail-technical';
import { MovieDetailTechnicalSkeleton } from './movie-detail-technical-skeleton';

import { Spacer } from '@/components/spacer';
import {
	useMovieCredits,
	useMovieDetailsSuspense,
} from '@/generated/tmdb/default/default';
import { useWatchlist } from '@/hooks/use-watchlist';

interface MovieDetailContentProps {
	movieId: number;
}

export function MovieDetailContent({ movieId }: MovieDetailContentProps) {
	const { isSaved, toggleSave } = useWatchlist();

	const { data: movie } = useMovieDetailsSuspense(movieId);

	const {
		data: credits,
		isError: isCreditsError,
		isLoading: isCreditsLoading,
		refetch: refetchCredits,
	} = useMovieCredits(movieId, {});

	const saved = isSaved(movieId);

	return (
		<div className="animate-in duration-700 fade-in slide-in-from-bottom-4">
			<MovieDetailHero
				movie={movie}
				saved={saved}
				onToggleSave={() => toggleSave(movieId)}
			/>
			<div className="container mx-auto px-4">
				<section className="border-t border-border pt-6">
					{isCreditsLoading ? <MovieDetailCastSkeleton /> : null}
					{isCreditsError ? (
						<MovieDetailSectionError
							message="Failed to load cast information."
							title="Cast"
							onRetry={() => void refetchCredits()}
						/>
					) : null}
					{credits?.cast && credits.cast.length > 0 ? (
						<MovieDetailCast cast={credits.cast} />
					) : null}
				</section>

				<Spacer size={24} />

				<section className="border-t border-border pt-6">
					{isCreditsLoading ? <MovieDetailTechnicalSkeleton /> : null}
					{isCreditsError ? (
						<MovieDetailSectionError
							message="Failed to load details."
							title="Details"
							onRetry={() => void refetchCredits()}
						/>
					) : null}
					{credits?.crew || movie.production_companies ? (
						<MovieDetailTechnical crew={credits?.crew} movie={movie} />
					) : null}
				</section>

				<Spacer size={24} />

				<section className="border-t border-border pt-6">
					<MovieDetailRecommendations movieId={movieId} />
				</section>
			</div>
		</div>
	);
}
