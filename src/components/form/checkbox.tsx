import clsx from 'clsx'
import { Checkbox as CheckboxExpo } from 'expo-checkbox'
import { Controller, useFormContext } from 'react-hook-form'
import { Platform, TouchableOpacity, View } from 'react-native'
import { twMerge } from 'tailwind-merge'

type CheckboxProps = {
	children?: React.ReactNode
	name: string
	value: string
}

export function Checkbox({ children, name, value }: CheckboxProps) {
	const { control } = useFormContext()

	return (
		<Controller
			control={control}
			name={name}
			render={({ field: { onChange, value: fieldValue } }) => {
				const isChecked = Array.isArray(fieldValue) ? fieldValue.includes(value) : false
				return (
					<TouchableOpacity
						className="flex-row items-center gap-3"
						onPress={() => (isChecked ? onChange(fieldValue.filter((v: string) => v !== value)) : onChange([...(fieldValue || []), value]))}
						activeOpacity={0.7}
					>
						<View
							className={twMerge(
								'h-5 w-5 items-center justify-center rounded-md border border-gray-400',
								clsx({
									'bg-purple-base': isChecked,
								}),
							)}
						>
							<CheckboxExpo
								style={{
									borderWidth: 0,
									width: 20,
									height: 20,
									opacity: isChecked ? 1 : 0,
									transform: Platform.OS !== 'web' ? [{ scaleX: 0.5 }, { scaleY: 0.5 }] : [{ scaleX: 0.75 }, { scaleY: 0.75 }],
								}}
								value={isChecked}
								color="#6a46eb"
							/>
						</View>
						{children}
					</TouchableOpacity>
				)
			}}
		/>
	)
}
