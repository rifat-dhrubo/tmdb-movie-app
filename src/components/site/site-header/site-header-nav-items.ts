import { linkOptions } from '@tanstack/react-router';

import type { IconName } from '@/generated/icons';

export const siteHeaderNavItems = [
	linkOptions({
		label: 'Home',
		to: '/',
		icon: 'house' satisfies IconName,
	}),
	linkOptions({
		label: 'Search',
		to: '/search',
		icon: 'magnifying_glass' satisfies IconName,
	}),
	linkOptions({
		label: 'Discover',
		to: '/discover',
		icon: 'compass' satisfies IconName,
	}),
	linkOptions({
		label: 'Watchlist',
		to: '/watchlist',
		icon: 'heart' satisfies IconName,
	}),
];

export function getSiteHeaderNavItems(showWatchlist: boolean) {
	return showWatchlist
		? siteHeaderNavItems
		: siteHeaderNavItems.filter((item) => item.to !== '/watchlist');
}

export interface SiteHeaderNavItem {
	label: string;
	to: string;
	icon: IconName;
}
