import { useReducedMotion } from 'motion/react';
import type { Transition, Variants } from 'motion/react';

// Easing curves
export const EASE_OUT_QUINT: [number, number, number, number] = [
	0.23, 1, 0.32, 1,
];
export const EASE_OUT_EXPO: [number, number, number, number] = [
	0.22, 1, 0.36, 1,
];
export const EASE_OUT_QUART: [number, number, number, number] = [
	0.77, 0, 0.175, 1,
];

// Standard container variants for staggered animations
interface CreateContainerVariantsOptions {
	delayChildren?: number;
	staggerChildren?: number;
}

export function createContainerVariants(
	options: CreateContainerVariantsOptions = {},
): Variants {
	const { delayChildren = 0.1, staggerChildren = 0.08 } = options;

	return {
		hidden: { opacity: 1 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren,
				delayChildren,
			},
		},
	};
}

// Standard item variants for fade-up animations
interface CreateItemVariantsOptions {
	y?: number;
	duration?: number;
	ease?: [number, number, number, number];
}

export function createItemVariants(
	options: CreateItemVariantsOptions = {},
): Variants {
	const { duration = 0.5, ease = EASE_OUT_QUINT, y = 30 } = options;

	return {
		hidden: { opacity: 0, y },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration,
				ease,
			},
		},
	};
}

// Reduced motion initial value helper
export function useReducedMotionInitial(): 'visible' | 'hidden' {
	const shouldReduceMotion = useReducedMotion();
	return shouldReduceMotion ? 'visible' : 'hidden';
}

// Standard transition configurations
export const transitions = {
	default: {
		duration: 0.5,
		ease: EASE_OUT_QUINT,
	},
	hover: {
		duration: 0.34,
		ease: EASE_OUT_EXPO,
	},
	entry: (index: number): Transition => ({
		delay: index * 0.055,
		duration: 0.55,
		ease: EASE_OUT_QUINT,
	}),
} as const;

// Pre-configured variants for common use cases
export const homeVariants = {
	// For hero section (slower, more dramatic)
	hero: {
		container: createContainerVariants({
			delayChildren: 0.1,
			staggerChildren: 0.1,
		}),
		item: createItemVariants({ y: 30 }),
	},
	// For CTA section (quick, snappy)
	cta: {
		container: createContainerVariants({
			delayChildren: 0.05,
			staggerChildren: 0.1,
		}),
		item: createItemVariants({ y: 20 }),
	},
	// For value props and shelves (balanced)
	section: {
		container: createContainerVariants({
			delayChildren: 0.1,
			staggerChildren: 0.08,
		}),
		item: createItemVariants({ y: 30 }),
		text: createItemVariants({ y: 20 }),
	},
} as const;
