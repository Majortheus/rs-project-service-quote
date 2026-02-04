import clsx from 'clsx'
import { View } from 'react-native'
import { twMerge } from 'tailwind-merge'
import type { QuoteFormType } from '@/app/create-quote'
import { Typography } from './typography'

type StatusProps = {
	status: StatusType
}

export type StatusType = QuoteFormType['status']

export function Status({ status }: StatusProps) {
	const text = status === 'draft' ? 'Rascunho' : status === 'sent' ? 'Enviado' : status === 'approved' ? 'Aprovado' : 'Rejeitado'
	return (
		<View
			className={twMerge(
				'flex-row items-center justify-center gap-1.5 rounded-md px-2 py-1',
				clsx({
					'bg-info-light': status === 'sent',
					'bg-gray-300': status === 'draft',
					'bg-success-light': status === 'approved',
					'bg-danger-light': status === 'rejected',
				}),
			)}
		>
			<View
				className={twMerge(
					'h-2 w-2 rounded-full',
					clsx({
						'bg-info-base': status === 'sent',
						'bg-gray-400': status === 'draft',
						'bg-success-base': status === 'approved',
						'bg-danger-base': status === 'rejected',
					}),
				)}
			/>
			<Typography
				variant="title-xs"
				className={clsx({
					'text-info-dark': status === 'sent',
					'text-gray-500': status === 'draft',
					'text-success-dark': status === 'approved',
					'text-danger-dark': status === 'rejected',
				})}
			>
				{text}
			</Typography>
		</View>
	)
}
