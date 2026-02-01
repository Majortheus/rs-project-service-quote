import clsx from 'clsx'
import { useRef } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { Pressable, TextInput } from 'react-native'
import { twMerge } from 'tailwind-merge'

type TextAreaProps = {
	name: string
	rows?: number
} & React.ComponentProps<typeof TextInput>

export function TextArea({ name, rows = 4, className, ...props }: TextAreaProps) {
	const inputRef = useRef<TextInput | null>(null)
	const { control } = useFormContext()

	return (
		<Controller
			control={control}
			name={name}
			render={({ field: { onChange, value }, fieldState: { error } }) => {
				return (
					<Pressable
						tabIndex={-1}
						onPress={() => inputRef.current?.focus()}
						className={twMerge(
							'group w-full rounded-[20px] border border-gray-300 bg-gray-100 px-4 py-0 focus-within:border-purple-base focus:border-purple-base',
							clsx({
								'border-danger-base focus-within:border-danger-base focus:border-danger-base': error,
							}),
						)}
					>
						<TextInput
							ref={inputRef}
							multiline
							numberOfLines={rows}
							textAlignVertical="top"
							className={twMerge('min-h-[80px] w-full py-3 text-base text-gray-700 leading-none outline-none placeholder:text-gray-500', className)}
							onChange={(e) => onChange(e.nativeEvent.text)}
							value={value?.toString()}
							{...props}
						/>
					</Pressable>
				)
			}}
		/>
	)
}

export default TextArea
