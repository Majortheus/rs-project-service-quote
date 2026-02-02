import clsx from 'clsx'
import { useRef } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { Pressable, TextInput, TouchableOpacity, View } from 'react-native'
import { twMerge } from 'tailwind-merge'
import { MinusMageIcon } from '@/assets/icons/mage-icons/minus-mage-icons'
import { PlusMageIcon } from '@/assets/icons/mage-icons/plus-mage-icons'

type QuantityProps = {
	name: string
	min?: number
	max?: number
	step?: number
	className?: string
} & React.ComponentProps<typeof TextInput>

export function Quantity({ name, min = 0, max = Infinity, step = 1, className, ...props }: QuantityProps) {
	const inputRef = useRef<TextInput | null>(null)
	const { control } = useFormContext()

	return (
		<Controller
			control={control}
			name={name}
			render={({ field, fieldState: { error } }) => {
				const raw = field.value
				const current = typeof raw === 'number' ? raw : raw ? Number(raw) : 0

				const change = (delta: number) => {
					let next = Number.isNaN(current) ? 0 : current + delta
					if (min !== undefined && next < min) next = min
					if (max !== undefined && next > max) next = max
					field.onChange(String(next))
				}

				return (
					<Pressable
						tabIndex={-1}
						onPress={() => inputRef.current?.focus()}
						className={twMerge(
							'group h-12 w-full flex-row items-center justify-center rounded-full border border-gray-300 bg-gray-100 px-4 focus-within:border-purple-base focus:border-purple-base',
							clsx({
								'border-danger-base focus-within:border-danger-base focus:border-danger-base': error,
							}),
						)}
					>
						<TouchableOpacity activeOpacity={0.7} onPress={() => change(-step)} className="h-5 w-5 items-baseline justify-center rounded-full">
							<MinusMageIcon className="h-5 w-5 text-purple-base" width={20} height={20} />
						</TouchableOpacity>

						<View className="flex-1">
							<TextInput
								id={name}
								ref={inputRef}
								className={twMerge('h-12 w-full shrink text-base text-gray-700 leading-1 outline-none placeholder:text-gray-500', className)}
								style={{ textAlign: 'center' }}
								onChangeText={(text) => field.onChange(text)}
								value={field.value ? String(field.value) : ''}
								keyboardType="numeric"
								{...props}
							/>
						</View>

						<TouchableOpacity activeOpacity={0.7} onPress={() => change(step)} className="h-5 w-5 items-center justify-center rounded-full">
							<PlusMageIcon className="h-5 w-5 text-purple-base" width={20} height={20} />
						</TouchableOpacity>
					</Pressable>
				)
			}}
		/>
	)
}
