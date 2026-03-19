import { motion, useReducedMotion } from 'motion/react';
import type { TargetAndTransition, Transition } from 'motion/react';
import React from 'react';

import type { CascadeFilm, CascadePosition } from '../constants';
import { EASE_OUT_EXPO, EASE_OUT_QUART, EASE_OUT_QUINT } from '../lib/motion';

import { buildTmdbImageUrl } from '@/lib/tmdb/image-config';

const ENTRY_EASE = EASE_OUT_QUINT;
const HOVER_EASE = EASE_OUT_EXPO;
const FLOAT_EASE = EASE_OUT_QUART;

interface CascadePosterProps {
	film: CascadeFilm;
	hoveredIndex: number | null;
	position: CascadePosition;
	index: number;
	originX: number;
	onHoverChange: (index: number | null) => void;
}

function getRelativeIndex(
	index: number,
	hoveredIndex: number | null,
): number | null {
	if (hoveredIndex == null) return null;
	return index - hoveredIndex;
}

function getHoverMotion(
	relativeIndex: number | null,
	rotate: number,
): { rotate: number; shift: number } {
	if (relativeIndex == null) {
		return { rotate, shift: 0 };
	}

	if (relativeIndex === 0) {
		return {
			rotate: rotate * 0.35,
			shift: 0,
		};
	}

	const direction = relativeIndex > 0 ? 1 : -1;
	const distance = Math.abs(relativeIndex);
	const shift = direction > 0 ? 120 + (distance - 1) * 24 : relativeIndex * 14;
	const rotateDelta = direction * Math.min(distance * 0.5, 1.5);

	return { rotate: rotate + rotateDelta, shift };
}

function getPosterTransition(
	index: number,
	hasEntered: boolean,
	shouldReduceMotion: boolean | null,
): Transition {
	if (shouldReduceMotion) return { duration: 0 };

	if (hasEntered) {
		return { duration: 0.34, ease: HOVER_EASE };
	}

	return {
		delay: index * 0.055,
		duration: 0.55,
		ease: ENTRY_EASE,
	};
}

function getFloatAnimation(
	shouldReduceMotion: boolean | null,
	isHoverActive: boolean,
	index: number,
): { animate: TargetAndTransition; transition: Transition } {
	if (shouldReduceMotion || isHoverActive) {
		return {
			animate: { y: 0 },
			transition: { duration: 0.3, ease: HOVER_EASE },
		};
	}

	return {
		animate: { y: [0, -10, 0] },
		transition: {
			duration: 8,
			ease: FLOAT_EASE,
			repeat: Infinity,
			delay: 0.55 + index * 0.08,
		},
	};
}

export function CascadePoster({
	film,
	hoveredIndex,
	index,
	onHoverChange,
	originX,
	position,
}: CascadePosterProps) {
	const [hasEntered, setHasEntered] = React.useState(false);
	const shouldReduceMotion = useReducedMotion();

	const isHoverActive = hoveredIndex !== null;
	const isHovered = hoveredIndex === index;
	const relativeIndex = getRelativeIndex(index, hoveredIndex);
	const hoverMotion = getHoverMotion(relativeIndex, position.rotate);
	const transition = getPosterTransition(index, hasEntered, shouldReduceMotion);
	const floatMotion = getFloatAnimation(
		shouldReduceMotion,
		isHoverActive,
		index,
	);

	const imageUrl = buildTmdbImageUrl({
		type: 'poster',
		path: film.posterPath,
		size: 'w500',
	});

	const handleAnimationComplete = () => {
		if (!hasEntered) setHasEntered(true);
	};

	return (
		<motion.div
			className="group absolute"
			transition={transition}
			animate={{
				opacity: 1,
				x: position.x + hoverMotion.shift,
				y: position.y,
				rotate: hoverMotion.rotate,
			}}
			initial={{
				opacity: 0,
				x: originX,
				y: position.y + 48,
				rotate: 0,
			}}
			style={{
				zIndex: isHovered ? position.zIndex + 10 : position.zIndex,
				transformOrigin: 'bottom center',
			}}
			onAnimationComplete={handleAnimationComplete}
			onHoverEnd={() => onHoverChange(null)}
			onHoverStart={() => onHoverChange(index)}
		>
			<motion.div
				animate={floatMotion.animate}
				transition={floatMotion.transition}
			>
				<div className="relative rounded-sm border border-border/40 bg-muted shadow-sm transition-shadow duration-300 group-hover:shadow-xl">
					<img
						alt={`${film.title} (${film.year})`}
						className="aspect-2/3 w-56 object-cover md:w-62"
						decoding="async"
						loading="lazy"
						src={imageUrl ?? undefined}
					/>
				</div>
			</motion.div>
		</motion.div>
	);
}
