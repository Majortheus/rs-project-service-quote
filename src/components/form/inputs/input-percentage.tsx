import clsx from 'clsx'
import { useRef } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { Pressable, TextInput, View } from 'react-native'
import { twMerge } from 'tailwind-merge'
import { Typography } from '../../typography'

type InputPercentageProps = {
	name: string
} & Omit<React.ComponentProps<typeof TextInput>, 'value' | 'onChange'>

function formatPercentage(value?: number) {
	if (value === undefined || value === null || Number.isNaN(value)) return ''
	return Math.abs(Math.round(value * 100) / 100).toFixed(0)
}

export function InputPercentage({ name, className, placeholder, ...props }: InputPercentageProps) {
	const inputRef = useRef<TextInput | null>(null)
	const { control } = useFormContext()

	const placeholderText = placeholder ?? '0'

	return (
		<Controller
			control={control}
			name={name}
			render={({ field: { onChange, value }, fieldState: { error } }) => {
				const displayValue = formatPercentage(value as number | undefined)

				return (
					<View className="gap-1">
						<Pressable
							tabIndex={-1}
							onPress={() => inputRef.current?.focus()}
							className={twMerge(
								'group h-8 w-full max-w-[80px] flex-row items-center justify-center rounded-full border border-gray-300 bg-gray-100 px-4 focus-within:border-purple-base focus:border-purple-base',
								clsx({
									'border-danger-base focus-within:border-danger-base focus:border-danger-base': error,
								}),
							)}
						>
							<TextInput
								ref={inputRef}
								className={twMerge('h-12 w-full shrink text-base text-gray-700 leading-[48px]! outline-none placeholder:text-gray-500', className)}
								style={{ lineHeight: 1, textAlign: 'center' }}
								onChange={(e) => {
									const digits = e.nativeEvent.text.replace(/\D/g, '')
									let num = digits ? parseInt(digits, 10) : 0
									if (num > 100) num = 100
									if (num < 0) num = 0
									onChange(num)
								}}
								value={displayValue}
								placeholder={placeholderText}
								keyboardType="numeric"
								selection={{ start: displayValue.length }}
								maxLength={3}
								{...props}
							/>

							<Typography variant="title-md" className="ml-2 flex text-base text-gray-600">
								%
							</Typography>
						</Pressable>
						{error && (
							<Typography variant="text-sm" className="px-6 text-danger-base">
								{error?.message}
							</Typography>
						)}
					</View>
				)
			}}
		/>
	)
}
