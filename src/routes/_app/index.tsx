import { createFileRoute } from '@tanstack/react-router';

import { HomeCtaSection } from '@/features/home/components/home-cta-section';
import { HomeEditorialShelf } from '@/features/home/components/home-editorial-shelf';
import { HomeFooter } from '@/features/home/components/home-footer';
import { HomeHero } from '@/features/home/components/home-hero';
import { ValuePropsSection } from '@/features/home/components/value-props-section';
import { SHELVES } from '@/features/home/constants';

export const Route = createFileRoute('/_app/')({
	component: HomePage,
});

function HomePage() {
	return (
		<>
			<main>
				<HomeHero />

				<section className="border-t py-16 md:py-24">
					<div className="container mx-auto px-4 md:px-6">
						<HomeEditorialShelf layout="text-left" shelf={SHELVES[0]} />
					</div>
				</section>

				<section className="border-t py-16 md:py-24">
					<div className="container mx-auto px-4 md:px-6">
						<HomeEditorialShelf layout="text-right" shelf={SHELVES[1]} />
					</div>
				</section>

				<section className="border-t py-16 md:py-24">
					<div className="container mx-auto px-4 md:px-6">
						<ValuePropsSection />
					</div>
				</section>

				<HomeCtaSection />
			</main>

			<HomeFooter />
		</>
	);
}
