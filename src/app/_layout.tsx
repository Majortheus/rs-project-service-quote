import { FontGuard } from '@/guards/font-guard'
import '@/styles/global.css'
import { Stack } from 'expo-router'
import { StatusBar } from 'react-native'
import 'react-native-reanimated'
import { QueryClientProvider } from '@tanstack/react-query'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { KeyboardProvider } from 'react-native-keyboard-controller'
import { BottomSheetProvider } from '@/hooks/useBottomSheets'
import { queryClient } from '@/libs/react-query'

export { ErrorBoundary } from 'expo-router'

export default function RootLayout() {
	return (
		<FontGuard>
			<GestureHandlerRootView>
				<QueryClientProvider client={queryClient}>
					<StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
					<BottomSheetProvider>
						<KeyboardProvider preload>
							<RootLayoutNav />
						</KeyboardProvider>
					</BottomSheetProvider>
				</QueryClientProvider>
			</GestureHandlerRootView>
		</FontGuard>
	)
}

function RootLayoutNav() {
	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name="(home)/index" />
			<Stack.Screen name="create-quote/index" />
			<Stack.Screen name="quote-details/index" />
		</Stack>
	)
}
