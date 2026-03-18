import { motion } from 'motion/react';
import type { Variants } from 'motion/react';

import { Icon } from '@/components/icon';
import { Spacer } from '@/components/spacer';
import { Button } from '@/components/ui/button';

interface HomeEditorialShelfTextContentProps {
	badge?: string;
	title: string;
	subtitle: string;
	variants: Variants;
}

export function HomeEditorialShelfTextContent({
	badge,
	subtitle,
	title,
	variants,
}: HomeEditorialShelfTextContentProps) {
	return (
		<motion.div className="flex flex-col justify-center" variants={variants}>
			{badge ? (
				<div className="mb-3 flex items-center gap-1.5">
					<span className="size-2 rounded-full bg-destructive-foreground" />
					<span className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
						{badge}
					</span>
				</div>
			) : null}
			<h2 className="font-serif text-4xl tracking-tight md:text-5xl">
				{title}
			</h2>
			<p className="mt-3 text-base text-muted-foreground md:text-lg">
				{subtitle}
			</p>
			<Spacer size={20}></Spacer>
			<Button
				className="group/btn relative w-fit px-0 pr-2 text-base hover:no-underline"
				type="button"
				variant="link"
			>
				See all{' '}
				<Icon
					className="inline-block transition-transform duration-200 group-hover/btn:translate-x-1"
					name="arrow_right_bold"
				></Icon>
				<span className="absolute -bottom-0.5 left-0 h-0.5 w-full origin-right scale-x-0 bg-primary transition-transform duration-200 group-hover/btn:origin-left group-hover/btn:scale-x-100" />
			</Button>
		</motion.div>
	);
}
