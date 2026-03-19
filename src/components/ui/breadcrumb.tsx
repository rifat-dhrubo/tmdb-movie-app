import { CaretRightIcon, DotsThreeIcon } from '@phosphor-icons/react';
import { Slot } from 'radix-ui';
// eslint-disable-next-line no-restricted-imports
import type * as React from 'react';

import { cn } from '@/lib/utils';

function Breadcrumb({ className, ...props }: React.ComponentProps<'nav'>) {
	return (
		<nav
			aria-label="breadcrumb"
			className={cn(className)}
			data-slot="breadcrumb"
			{...props}
		/>
	);
}

function BreadcrumbList({ className, ...props }: React.ComponentProps<'ol'>) {
	return (
		<ol
			data-slot="breadcrumb-list"
			className={cn(
				'flex flex-wrap items-center gap-1.5 text-sm wrap-break-word text-muted-foreground',
				className,
			)}
			{...props}
		/>
	);
}

function BreadcrumbItem({ className, ...props }: React.ComponentProps<'li'>) {
	return (
		<li
			className={cn('inline-flex items-center gap-1', className)}
			data-slot="breadcrumb-item"
			{...props}
		/>
	);
}

function BreadcrumbLink({
	asChild,
	className,
	...props
}: React.ComponentProps<'a'> & {
	asChild?: boolean;
}) {
	const Comp = asChild ? Slot.Root : 'a';

	return (
		<Comp
			className={cn('transition-colors hover:text-foreground', className)}
			data-slot="breadcrumb-link"
			{...props}
		/>
	);
}

function BreadcrumbPage({ className, ...props }: React.ComponentProps<'span'>) {
	return (
		<span
			aria-current="page"
			aria-disabled="true"
			className={cn('font-normal text-foreground', className)}
			data-slot="breadcrumb-page"
			role="link"
			{...props}
		/>
	);
}

function BreadcrumbSeparator({
	children,
	className,
	...props
}: React.ComponentProps<'li'>) {
	return (
		<li
			aria-hidden="true"
			className={cn('[&>svg]:size-3.5', className)}
			data-slot="breadcrumb-separator"
			role="presentation"
			{...props}
		>
			{children ?? <CaretRightIcon />}
		</li>
	);
}

function BreadcrumbEllipsis({
	className,
	...props
}: React.ComponentProps<'span'>) {
	return (
		<span
			aria-hidden="true"
			data-slot="breadcrumb-ellipsis"
			role="presentation"
			className={cn(
				'flex size-5 items-center justify-center [&>svg]:size-4',
				className,
			)}
			{...props}
		>
			<DotsThreeIcon />
			<span className="sr-only">More</span>
		</span>
	);
}

export {
	Breadcrumb,
	BreadcrumbList,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbPage,
	BreadcrumbSeparator,
	BreadcrumbEllipsis,
};
