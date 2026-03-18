import React from 'react';

import {
	CASCADE_FILMS,
	CASCADE_ORIGIN_X,
	CASCADE_POSITIONS,
} from '../constants';

import { CascadePoster } from './home-cascade-poster';
import { HomeSearchForm } from './home-search-form';

import { Badge } from '@/components/ui/badge';

export function HomeHero() {
	const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);

	return (
		<section className="relative overflow-hidden py-20 md:py-28 lg:py-32">
			<div className="container mx-auto px-4 md:px-6">
				<div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-12">
					<div className="stagger-children flex flex-col justify-center">
						<div className="mb-6 flex items-center gap-2">
							<Badge variant="outline">
								<span className="size-1.5 rounded-full bg-primary" />
								Personal Film Journal
							</Badge>
						</div>

						<h1 className="font-serif text-5xl font-normal tracking-tight md:text-6xl lg:text-7xl">
							Curate your <em className="text-primary">cinema.</em>
						</h1>

						<p className="mt-6 max-w-md text-lg text-muted-foreground md:text-xl">
							A personal journal for the films that matter
						</p>

						<div className="mt-8 max-w-md">
							<HomeSearchForm />
						</div>
					</div>

					<div className="relative flex items-center justify-center lg:justify-end">
						<div className="relative w-full max-w-sm md:max-w-xl">
							<div className="relative h-100 w-full overflow-visible md:h-130">
								{CASCADE_FILMS.map((film, index) => (
									<CascadePoster
										key={film.title}
										film={film}
										hoveredIndex={hoveredIndex}
										index={index}
										originX={CASCADE_ORIGIN_X}
										position={CASCADE_POSITIONS[index]}
										onHoverChange={setHoveredIndex}
									/>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
