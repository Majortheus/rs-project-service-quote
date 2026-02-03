import clsx from 'clsx'
import { useEffect, useRef } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { Pressable, TextInput, View } from 'react-native'
import { twMerge } from 'tailwind-merge'
import { Typography } from '@/components/typography'
import { formatMoney } from '@/utils/formatMoney'

type InputMoneyProps = {
	name: string
} & Omit<React.ComponentProps<typeof TextInput>, 'value' | 'onChange'>

export function InputMoney({ name, className, placeholder, ...props }: InputMoneyProps) {
	const inputRef = useRef<TextInput | null>(null)
	const rawDigitsRef = useRef<string>('')
	const { control, getValues } = useFormContext()

	useEffect(() => {
		const initial = getValues(name) as number | undefined
		rawDigitsRef.current = initial ? String(Math.round(Math.abs(initial) * 100)) : '0,00'
	}, [getValues, name])

	const placeholderText = placeholder ?? '0,00'

	return (
		<Controller
			control={control}
			name={name}
			render={({ field: { onChange, value }, fieldState: { error } }) => {
				const displayValue = formatMoney(value)

				return (
					<View className="gap-1">
						<Pressable
							tabIndex={-1}
							onPress={() => inputRef.current?.focus()}
							className={twMerge(
								'group h-12 w-full flex-row items-baseline justify-center rounded-full border border-gray-300 bg-gray-100 px-4 focus-within:border-purple-base focus:border-purple-base',
								clsx({
									'border-danger-base focus-within:border-danger-base focus:border-danger-base': error,
								}),
							)}
						>
							<Typography variant="title-md" className="mr-2 flex w-5">
								R$
							</Typography>

							<TextInput
								ref={inputRef}
								className={twMerge('h-12 w-full shrink text-base text-gray-700 leading-[48px] outline-none placeholder:text-gray-500', className)}
								onChange={(e) => {
									const digits = e.nativeEvent.text.replace(/\D/g, '')
									const num = digits ? parseInt(digits, 10) / 100 : 0
									onChange(num)
								}}
								value={displayValue}
								placeholder={placeholderText}
								keyboardType="numeric"
								selection={{ start: displayValue.length }}
								{...props}
							/>
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
