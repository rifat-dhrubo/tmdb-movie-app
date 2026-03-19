import { Spacer } from '@/components/spacer';
import type {
	MovieCredits200CrewItem,
	MovieDetails200,
} from '@/generated/tmdb/tmdbApi.schemas';
import { formatCurrency, formatDate, formatRuntime } from '@/lib/utils';

interface MovieDetailTechnicalProps {
	crew?: Array<MovieCredits200CrewItem>;
	movie: MovieDetails200;
}

export function MovieDetailTechnical({
	crew,
	movie,
}: MovieDetailTechnicalProps) {
	const director = crew?.find((p) => p.job?.toLowerCase() === 'director');
	const writers =
		crew?.filter((p) => {
			const job = p.job?.toLowerCase() ?? '';
			return job.includes('writer') || job.includes('screenplay');
		}) ?? [];

	const rows = [
		{
			left: { label: 'Director', value: director?.name ?? '-' },
			right: {
				label: 'Writers',
				value: writers.map((w) => w.name).join(', ') || '-',
			},
		},
		{
			left: { label: 'Release Date', value: formatDate(movie.release_date) },
			right: { label: 'Runtime', value: formatRuntime(movie.runtime) },
		},
		{
			left: {
				label: 'Language',
				value:
					movie.spoken_languages?.map((l) => l.english_name).join(', ') ?? '-',
			},
			right: {
				label: 'Country',
				value: movie.production_countries?.map((c) => c.name).join(', ') ?? '-',
			},
		},
		{
			left: { label: 'Budget', value: formatCurrency(movie.budget) },
			right: { label: 'Revenue', value: formatCurrency(movie.revenue) },
		},
		{
			left: {
				label: 'Status',
				value: movie.status
					? movie.status.charAt(0).toUpperCase() +
						movie.status.slice(1).toLowerCase()
					: '-',
			},
			right: {
				label: 'Production',
				value: movie.production_companies?.map((c) => c.name).join(', ') ?? '-',
			},
		},
	];

	const hasContent = rows.some(
		(row) =>
			row.left.value !== '-' ||
			row.right.value !== '-' ||
			row.left.label === 'Director' ||
			row.left.label === 'Release Date',
	);

	if (!hasContent) return null;

	return (
		<div>
			<h2 className="font-serif text-2xl tracking-tight text-foreground md:text-3xl">
				Details
			</h2>

			<Spacer size={12}></Spacer>

			<div className="rounded-sm border border-border">
				{rows.map((row, index) => (
					<div
						key={row.left.label}
						className={`grid grid-cols-2 ${
							index !== rows.length - 1 ? 'border-b border-border' : ''
						}`}
					>
						{/* Left column */}
						<div className="flex items-center justify-between border-r border-border px-4 py-3">
							<span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
								{row.left.label}
							</span>
							<span className="text-sm text-foreground">{row.left.value}</span>
						</div>

						{/* Right column */}
						<div className="flex items-center justify-between px-4 py-3">
							<span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
								{row.right.label}
							</span>
							<span className="text-sm text-foreground">{row.right.value}</span>
						</div>
					</div>
				))}
			</div>
			<Spacer size={12}></Spacer>
		</div>
	);
}
