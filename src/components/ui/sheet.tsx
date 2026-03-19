import { XIcon } from '@phosphor-icons/react';
import { Dialog as SheetPrimitive } from 'radix-ui';
import type React from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

function Sheet({ ...props }: React.ComponentProps<typeof SheetPrimitive.Root>) {
	return <SheetPrimitive.Root data-slot="sheet" {...props} />;
}

function SheetTrigger({
	...props
}: React.ComponentProps<typeof SheetPrimitive.Trigger>) {
	return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
}

function SheetClose({
	...props
}: React.ComponentProps<typeof SheetPrimitive.Close>) {
	return <SheetPrimitive.Close data-slot="sheet-close" {...props} />;
}

function SheetPortal({
	...props
}: React.ComponentProps<typeof SheetPrimitive.Portal>) {
	return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />;
}

function SheetOverlay({
	className,
	...props
}: React.ComponentProps<typeof SheetPrimitive.Overlay>) {
	return (
		<SheetPrimitive.Overlay
			data-slot="sheet-overlay"
			className={cn(
				'motion-overlay fixed inset-0 z-50 bg-black/12 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0 supports-backdrop-filter:backdrop-blur-xs',
				className,
			)}
			{...props}
		/>
	);
}

function SheetContent({
	children,
	className,
	showCloseButton = true,
	side = 'right',
	...props
}: React.ComponentProps<typeof SheetPrimitive.Content> & {
	side?: 'top' | 'right' | 'bottom' | 'left';
	showCloseButton?: boolean;
}) {
	return (
		<SheetPortal>
			<SheetOverlay />
			<SheetPrimitive.Content
				data-side={side}
				data-slot="sheet-content"
				className={cn(
					'motion-sheet fixed z-50 flex flex-col gap-4 bg-background bg-clip-padding text-sm shadow-lg data-[side=bottom]:inset-x-0 data-[side=bottom]:bottom-0 data-[side=bottom]:h-auto data-[side=bottom]:border-t data-[side=left]:inset-y-0 data-[side=left]:left-0 data-[side=left]:h-full data-[side=left]:w-3/4 data-[side=left]:border-r data-[side=right]:inset-y-0 data-[side=right]:right-0 data-[side=right]:h-full data-[side=right]:w-3/4 data-[side=right]:border-l data-[side=top]:inset-x-0 data-[side=top]:top-0 data-[side=top]:h-auto data-[side=top]:border-b data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[side=bottom]:data-[state=closed]:slide-out-to-bottom-full data-[side=left]:data-[state=closed]:slide-out-to-left-full data-[side=right]:data-[state=closed]:slide-out-to-right-full data-[side=top]:data-[state=closed]:slide-out-to-top-full data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[side=bottom]:data-[state=open]:slide-in-from-bottom-full data-[side=left]:data-[state=open]:slide-in-from-left-full data-[side=right]:data-[state=open]:slide-in-from-right-full data-[side=top]:data-[state=open]:slide-in-from-top-full data-[side=left]:sm:max-w-sm data-[side=right]:sm:max-w-sm',
					className,
				)}
				{...props}
			>
				{children}
				{showCloseButton ? (
					<SheetPrimitive.Close asChild data-slot="sheet-close">
						<Button
							className="absolute top-3 right-3"
							size="icon-sm"
							variant="ghost"
						>
							<XIcon />
							<span className="sr-only">Close</span>
						</Button>
					</SheetPrimitive.Close>
				) : null}
			</SheetPrimitive.Content>
		</SheetPortal>
	);
}

function SheetHeader({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			className={cn('flex flex-col gap-0.5 p-4', className)}
			data-slot="sheet-header"
			{...props}
		/>
	);
}

function SheetFooter({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			className={cn('mt-auto flex flex-col gap-2 p-4', className)}
			data-slot="sheet-footer"
			{...props}
		/>
	);
}

function SheetTitle({
	className,
	...props
}: React.ComponentProps<typeof SheetPrimitive.Title>) {
	return (
		<SheetPrimitive.Title
			className={cn('text-base font-medium text-foreground', className)}
			data-slot="sheet-title"
			{...props}
		/>
	);
}

function SheetDescription({
	className,
	...props
}: React.ComponentProps<typeof SheetPrimitive.Description>) {
	return (
		<SheetPrimitive.Description
			className={cn('text-sm text-muted-foreground', className)}
			data-slot="sheet-description"
			{...props}
		/>
	);
}

export {
	Sheet,
	SheetTrigger,
	SheetClose,
	SheetContent,
	SheetHeader,
	SheetFooter,
	SheetTitle,
	SheetDescription,
};
