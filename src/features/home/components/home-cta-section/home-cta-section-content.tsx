import { Link } from '@tanstack/react-router';
import { motion } from 'motion/react';
import type { Variants } from 'motion/react';

import type { CtaContent } from './types';

import { Icon } from '@/components/icon';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface HomeCtaSectionContentProps {
	content: CtaContent;
	variants: Variants;
}

export function HomeCtaSectionContent({
	content,
	variants,
}: HomeCtaSectionContentProps) {
	return (
		<div className="mx-auto max-w-2xl text-center">
			<Badge variant="secondary">
				<span className="size-1.5 rounded-full bg-primary" />
				{content.badge}
			</Badge>

			<motion.h2
				className="font-serif text-4xl leading-[1.02] tracking-tight text-primary-foreground sm:text-5xl md:text-6xl lg:text-7xl"
				variants={variants}
			>
				<span className="block dark:text-foreground">
					{content.headline[0]}
				</span>
				<span className="block dark:text-foreground">
					{content.headline[1]}{' '}
					<em className="text-primary">{content.accentWord}</em>
				</span>
			</motion.h2>

			<motion.p
				className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg md:mt-7"
				variants={variants}
			>
				{content.body}
			</motion.p>

			<motion.div
				className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4 md:mt-12"
				variants={variants}
			>
				<Button asChild size="xl">
					<Link to={content.primaryCta.href}>{content.primaryCta.text}</Link>
				</Button>
				<Button asChild size="xl" variant="outline">
					<Link to={content.secondaryCta.href}>
						{content.secondaryCta.text}
						<Icon className="size-3.5" name="arrow_right_bold" />
					</Link>
				</Button>
			</motion.div>

			<motion.p
				className="mt-7 text-sm text-primary-foreground/35 md:mt-8"
				variants={variants}
			>
				{content.footnote}
			</motion.p>
		</div>
	);
}
