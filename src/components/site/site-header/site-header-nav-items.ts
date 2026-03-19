import { Compass, Heart, House, MagnifyingGlass } from '@phosphor-icons/react';
import type { Icon } from '@phosphor-icons/react';
import { linkOptions } from '@tanstack/react-router';

export const siteHeaderNavItems = [
	linkOptions({
		label: 'Home',
		to: '/',
		icon: House satisfies typeof House,
	}),
	linkOptions({
		label: 'Search',
		to: '/search',
		icon: MagnifyingGlass satisfies typeof MagnifyingGlass,
	}),
	linkOptions({
		label: 'Discover',
		to: '/discover',
		icon: Compass satisfies typeof Compass,
	}),
	linkOptions({
		label: 'Watchlist',
		to: '/watchlist',
		icon: Heart satisfies typeof Heart,
	}),
];

export interface SiteHeaderNavItem {
	label: string;
	to: string;
	icon?: Icon;
}
