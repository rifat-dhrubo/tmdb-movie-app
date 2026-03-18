import type { ReactNode } from 'react';

interface MovieGridProps {
	children: ReactNode;
	columns?: 'search' | 'discover';
}

export function MovieGrid({ children, columns = 'search' }: MovieGridProps) {
	// Search: 6 columns desktop
	// Discover: 5 columns desktop
	const columnClasses =
		columns === 'search'
			? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6'
			: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5';

	return <div className={`grid ${columnClasses} gap-6`}>{children}</div>;
}
