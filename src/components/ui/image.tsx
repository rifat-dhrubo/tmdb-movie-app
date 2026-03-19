import React from 'react';

import { Skeleton } from './skeleton';

import { cn } from '@/lib/utils';

interface ImageProps extends React.ComponentProps<'img'> {
	aspectRatio?: '2/3' | '1/1' | '16/9' | 'auto';
	fallback?: React.ReactNode;
	containerClassName?: string;
}

function Image({
	alt = '',
	aspectRatio = 'auto',
	className,
	containerClassName,
	fallback,
	...props
}: ImageProps) {
	const [imageState, setImageState] = React.useState<
		'loading' | 'loaded' | 'error'
	>('loading');

	const aspectRatioClass =
		aspectRatio !== 'auto' ? `aspect-[${aspectRatio.replace('/', '-')}]` : '';

	return (
		<div
			data-slot="image-container"
			className={cn(
				'relative overflow-hidden',
				aspectRatioClass,
				containerClassName,
			)}
		>
			{imageState === 'error' && fallback ? (
				fallback
			) : (
				<>
					{imageState === 'loading' ? (
						<Skeleton className="absolute inset-0" data-slot="image-skeleton" />
					) : null}
					<img
						alt={alt}
						data-slot="image"
						className={cn(
							'h-full w-full object-cover transition-opacity duration-500',
							imageState === 'loaded' ? 'opacity-100' : 'opacity-0',
							className,
						)}
						{...props}
						onError={() => setImageState('error')}
						onLoad={() => setImageState('loaded')}
					/>
				</>
			)}
		</div>
	);
}

export { Image };
export type { ImageProps };
