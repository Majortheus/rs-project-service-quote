import clsx from 'clsx'
import { TouchableOpacity } from 'react-native'
import { twMerge } from 'tailwind-merge'
import { Typography } from './typography'

type ButtonProps = {
	children?: string
	startIcon?: React.ComponentType<{ className?: string }>
	variant?: 'filled' | 'outlined'
	color?: 'primary' | 'danger'
} & React.ComponentProps<typeof TouchableOpacity>

export function Button({ children, startIcon: StartIcon, variant = 'filled', color = 'primary', ...props }: ButtonProps) {
	const textColor = clsx({
		'text-white': variant === 'filled',
		'text-purple-base': variant === 'outlined' && color === 'primary',
		'text-danger-base': variant === 'outlined' && color === 'danger',
	})

	return (
		<TouchableOpacity
			activeOpacity={0.6}
			className={twMerge(
				'h-[48px] flex-row items-center justify-center rounded-full p-3',
				clsx({
					'bg-purple-base': variant === 'filled' && color === 'primary',
					'bg-danger-base': variant === 'filled' && color === 'danger',
					'border border-gray-300': variant === 'outlined',
				}),
			)}
			{...props}
		>
			{StartIcon && <StartIcon className={twMerge(clsx({ 'mr-1': StartIcon && children }), textColor)} />}
			<Typography variant="title-sm" className={textColor}>
				{children}
			</Typography>
		</TouchableOpacity>
	)
}
