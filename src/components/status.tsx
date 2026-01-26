import clsx from 'clsx'
import { View } from 'react-native'
import { twMerge } from 'tailwind-merge'
import { Typography } from './typography'

type StatusProps = {
	status: StatusType
}

export type StatusType = 'Rascunho' | 'Enviado' | 'Aprovado' | 'Recusado'

export function Status({ status }: StatusProps) {
	return (
		<View
			className={twMerge(
				'flex-row items-center justify-center gap-1.5 rounded-md px-2 py-1',
				clsx({
					'bg-info-light': status === 'Enviado',
					'bg-gray-300': status === 'Rascunho',
					'bg-success-light': status === 'Aprovado',
					'bg-danger-light': status === 'Recusado',
				}),
			)}
		>
			<View
				className={twMerge(
					'h-2 w-2 rounded-full',
					clsx({
						'bg-info-base': status === 'Enviado',
						'bg-gray-400': status === 'Rascunho',
						'bg-success-base': status === 'Aprovado',
						'bg-danger-base': status === 'Recusado',
					}),
				)}
			/>
			<Typography
				variant="title-xs"
				className={clsx({
					'text-info-dark': status === 'Enviado',
					'text-gray-500': status === 'Rascunho',
					'text-success-dark': status === 'Aprovado',
					'text-danger-dark': status === 'Recusado',
				})}
			>
				{status}
			</Typography>
		</View>
	)
}
