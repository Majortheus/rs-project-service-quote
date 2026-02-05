import clsx from 'clsx'
import { TouchableOpacity } from 'react-native'
import { twMerge } from 'tailwind-merge'
import { Typography } from './typography'

type ButtonProps = {
	children?: string
	startIcon?: React.ComponentType<{ className?: string }>
	variant?: 'filled' | 'outlined' | 'ghost'
	color?: 'primary' | 'danger'
} & React.ComponentProps<typeof TouchableOpacity>

export function Button({ children, startIcon: StartIcon, variant = 'filled', color = 'primary', className, ...props }: ButtonProps) {
	const textColor = clsx({
		'text-white': variant === 'filled',
		'text-purple-base': (variant === 'outlined' || variant === 'ghost') && color === 'primary',
		'text-danger-base': (variant === 'outlined' || variant === 'ghost') && color === 'danger',
	})

	return (
		<TouchableOpacity
			activeOpacity={0.6}
			className={twMerge(
				'min-h-[48px] flex-row items-center justify-center rounded-full p-3',
				clsx({
					'border border-purple-base bg-purple-base': variant === 'filled' && color === 'primary',
					'border border-danger-base bg-danger-base': variant === 'filled' && color === 'danger',
					'border border-gray-300 bg-gray-100': variant === 'outlined',
					'p-1': variant === 'ghost',
				}),
				className,
			)}
			{...props}
		>
			{StartIcon && <StartIcon className={twMerge(clsx({ 'mr-2': StartIcon && children }), textColor)} />}
			<Typography variant="title-sm" className={textColor}>
				{children}
			</Typography>
		</TouchableOpacity>
	)
}
