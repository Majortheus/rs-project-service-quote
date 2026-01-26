import clsx from 'clsx'
import { Text } from 'react-native'
import { twMerge } from 'tailwind-merge'

type TypographyProps = {
	children: React.ReactNode
	className?: string
	variant?: 'text-xs' | 'text-sm' | 'text-md' | 'title-xs' | 'title-sm' | 'title-md' | 'title-lg'
}

export function Typography({ children, className, variant = 'text-md' }: TypographyProps) {
	return (
		<Text
			className={twMerge(
				'font-normal text-gray-700 leading-snug',
				clsx(
					{
						'text-xs': variant === 'text-xs',
						'text-sm': variant === 'text-sm',
						'text-base': variant === 'text-md',
						'font-bold text-xs': variant === 'title-xs',
						'font-bold text-sm': variant === 'title-sm',
						'font-bold text-base': variant === 'title-md',
						'font-bold text-lg': variant === 'title-lg',
					},
					className,
				),
			)}
		>
			{children}
		</Text>
	)
}
