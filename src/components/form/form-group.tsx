import type React from 'react'
import type { ReactNode } from 'react'
import { View } from 'react-native'
import { Typography } from '@/components/typography'

type IconComponent = React.FunctionComponent<{ className?: string; width?: number; height?: number }>

type FormGroupProps = {
	title: string
	icon?: IconComponent
	children: ReactNode
}

export function FormGroup({ title, icon: Icon, children }: FormGroupProps) {
	return (
		<View className="rounded-lg border border-gray-300">
			<View className="w-full flex-row items-center gap-2 border-gray-300 border-b px-4 py-3">
				{Icon && <Icon className="h-5 w-5 text-purple-base" width={20} height={20} />}
				<Typography variant="text-xs" className="text-gray-500">
					{title}
				</Typography>
			</View>
			{children}
		</View>
	)
}
