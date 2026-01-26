import { Link, Stack } from 'expo-router'
import { Text, View } from 'react-native'

export default function NotFoundScreen() {
	return (
		<>
			<Stack.Screen options={{ title: 'Oops!' }} />
			<View className="flex items-center justify-center p-5">
				<Text className="font-bold text-2xl">This screen doesn't exist.</Text>

				<Link href="/(home)" className="mt-4 py-4">
					<Text className="text-blue-600 text-sm">Go to home screen!</Text>
				</Link>
			</View>
		</>
	)
}
