import clsx from 'clsx'
import { useRef } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { Pressable, TextInput } from 'react-native'
import { twMerge } from 'tailwind-merge'

type InputProps = {
	name: string
	startIcon?: React.FunctionComponent<{ className?: string; width?: number; height?: number }>
} & React.ComponentProps<typeof TextInput>

export function Input({ name, startIcon: StartIcon, className, ...props }: InputProps) {
	const inputRef = useRef<TextInput | null>(null)
	const { control } = useFormContext()

	return (
		<Controller
			control={control}
			name={name}
			render={({ field: { onChange, value }, fieldState: { error } }) => (
				<Pressable
					accessible={false}
					onPress={() => inputRef.current?.focus()}
					className={twMerge(
						'group h-12 w-full flex-1 flex-row items-center justify-center rounded-full border border-gray-300 px-4 focus-within:border-purple-base focus:border-purple-base',
						clsx({
							'border-danger-base focus-within:border-danger-base focus:border-danger-base': error,
						}),
					)}
				>
					{StartIcon && (
						<StartIcon
							className={twMerge(
								'mr-2 h-5 w-5 text-gray-600 group-focus-within:text-purple-base group-focus:text-purple-base',
								clsx({ 'text-danger-base group-focus-within:text-danger-base group-focus:text-danger-base': error }),
							)}
							width={20}
							height={20}
						/>
					)}
					<TextInput
						id={name}
						ref={inputRef}
						className={twMerge('h-12 flex-1 text-base text-gray-700 outline-none placeholder:text-gray-500', className)}
						onChange={onChange}
						value={value}
						{...props}
					/>
				</Pressable>
			)}
		/>
	)
}
