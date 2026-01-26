import clsx from 'clsx'
import { TextInput, View } from 'react-native'
import { twMerge } from 'tailwind-merge'

type InputProps = {
	startIcon: React.FunctionComponent<{ className?: string; width?: number; height?: number }>
} & React.ComponentProps<typeof TextInput>

export function Input({ startIcon: StartIcon, className, ...props }: InputProps) {
	const hasError = false

	return (
		<View
			className={twMerge(
				'group h-12 flex-1 flex-row items-center rounded-full border border-gray-300 px-4 py-3 focus-within:border-purple-base focus:border-purple-base',
				clsx({
					'border-danger-base focus-within:border-danger-base focus:border-danger-base': hasError,
				}),
			)}
		>
			{StartIcon && (
				<StartIcon
					className={twMerge(
						'mr-2 text-gray-600 group-focus-within:text-purple-base group-focus:text-purple-base',
						clsx({ 'text-danger-base group-focus-within:text-danger-base group-focus:text-danger-base': hasError }),
					)}
					width={20}
					height={20}
				/>
			)}
			<TextInput className={twMerge('h-12 flex-1 text-base text-gray-700 outline-none placeholder:text-gray-500', className)} {...props} />
		</View>
	)
}
