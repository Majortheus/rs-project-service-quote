import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export function Page({ children }: { children: React.ReactNode }) {
	return (
		<View className="flex-1 items-center bg-white">
			<SafeAreaView className="w-full max-w-5xl">{children}</SafeAreaView>
		</View>
	)
}
