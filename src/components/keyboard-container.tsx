import type { FC, ReactNode } from 'react'
import { KeyboardAvoidingView, Platform } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

interface KeyboardContainerProps {
	children: ReactNode
}

export const KeyboardContainer: FC<KeyboardContainerProps> = ({ children }) => {
	return (
		<SafeAreaView className="flex-1" edges={['top']}>
			<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} className="h-full bg-amber-900">
				{children}
			</KeyboardAvoidingView>
		</SafeAreaView>
	)
}
