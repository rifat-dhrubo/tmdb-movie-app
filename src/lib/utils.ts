import { clsx } from 'clsx';
import type { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: Array<ClassValue>) {
	return twMerge(clsx(inputs));
}

export function formatRuntime(minutes: number | undefined): string {
	if (!minutes) return '';
	const hours = Math.floor(minutes / 60);
	const mins = minutes % 60;
	if (hours === 0) return `${mins}m`;
	if (mins === 0) return `${hours}h`;
	return `${hours}h ${mins}m`;
}

export function formatCurrency(amount: number | undefined): string {
	if (amount == null || amount === 0) return '-';
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		maximumFractionDigits: 0,
	}).format(amount);
}

export function formatDate(dateString: string | undefined): string {
	if (!dateString) return '-';
	return new Date(dateString).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});
}
