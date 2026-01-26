import clsx from 'clsx'
import type React from 'react'
import { useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { TouchableOpacity, View } from 'react-native'
import { twMerge } from 'tailwind-merge'
import { Typography } from '../typography'

type RadioProps = {
	children?: string | React.ReactNode
	name: string
	value: string
}

export function Radio({ children, name, value }: RadioProps) {
	const { control } = useFormContext()

	return (
		<Controller
			control={control}
			name={name}
			render={({ field: { onChange, value: fieldValue } }) => {
				const isChecked = fieldValue === value
				return (
					<TouchableOpacity onPress={() => onChange(value)} activeOpacity={0.7} className="flex-row items-center gap-3">
						<View
							className={twMerge(
								'h-5 w-5 items-center justify-center rounded-full border border-gray-400 bg-white',
								clsx({
									'border-purple-base bg-purple-base': isChecked,
								}),
							)}
						>
							{isChecked && <View className="h-2 w-2 rounded-full bg-white" />}
						</View>

						{children && typeof children === 'string' ? <Typography variant="text-md">{children}</Typography> : children}
					</TouchableOpacity>
				)
			}}
		/>
	)
}
