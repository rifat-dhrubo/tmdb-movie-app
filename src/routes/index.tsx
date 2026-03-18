import { createFileRoute } from '@tanstack/react-router';

import { SiteHeader } from '@/components/site/site-header';
import { EditorialShelf } from '@/features/home/components/editorial-shelf';
import { HomeCtaSection } from '@/features/home/components/home-cta-section';
import { HomeFooter } from '@/features/home/components/home-footer';
import { HomeHero } from '@/features/home/components/home-hero';
import { ValuePropsSection } from '@/features/home/components/value-props-section';
import { SHELVES } from '@/features/home/constants';

export const Route = createFileRoute('/')({
	component: HomePage,
});

function HomePage() {
	return (
		<div className="min-h-screen bg-background">
			<SiteHeader />

			<main>
				{/* Hero with cascade */}
				<HomeHero />

				{/* Shelf 1: Tonight */}
				<section className="bg-secondary/20 py-16 md:py-24">
					<div className="container mx-auto px-4 md:px-6">
						<EditorialShelf index={0} shelf={SHELVES[0]} />
					</div>
				</section>

				{/* Shelf 2: For Rainy Sundays */}
				<section className="py-16 md:py-24">
					<div className="container mx-auto px-4 md:px-6">
						<EditorialShelf index={1} shelf={SHELVES[1]} />
					</div>
				</section>

				{/* Value props */}
				<section className="bg-secondary/20 py-16 md:py-24">
					<div className="container mx-auto px-4 md:px-6">
						<ValuePropsSection />
					</div>
				</section>

				{/* CTA */}
				<section className="py-24 md:py-32">
					<div className="container mx-auto px-4 text-center md:px-6">
						<HomeCtaSection />
					</div>
				</section>
			</main>

			<HomeFooter />
		</div>
	);
}
