import { useTheme } from 'next-themes';
import { Toaster as Sonner } from 'sonner';
import type { ToasterProps } from 'sonner';

import { Icon } from '@/components/icon';

const Toaster = ({ ...props }: ToasterProps) => {
	const { theme = 'system' } = useTheme();

	return (
		<Sonner
			className="toaster group"
			theme={theme as ToasterProps['theme']}
			icons={{
				success: <Icon className="size-4" name="check_circle_bold" />,
				info: <Icon className="size-4" name="info_bold" />,
				warning: <Icon className="size-4" name="warning_bold" />,
				error: <Icon className="size-4" name="x_circle_bold" />,
				loading: <Icon className="size-4 animate-spin" name="spinner_bold" />,
			}}
			style={
				{
					'--normal-bg': 'var(--popover)',
					'--normal-text': 'var(--popover-foreground)',
					'--normal-border': 'var(--border)',
					'--border-radius': 'var(--radius)',
				} as React.CSSProperties
			}
			toastOptions={{
				classNames: {
					toast: 'cn-toast',
				},
			}}
			{...props}
		/>
	);
};

export { Toaster };
