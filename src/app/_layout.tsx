import { FontGuard } from '@/guards/font-guard'
import '@/styles/global.css'
import { Stack } from 'expo-router'
import { StatusBar } from 'react-native'
import 'react-native-reanimated'
import { Toasts } from '@backpackapp-io/react-native-toast'
import { QueryClientProvider } from '@tanstack/react-query'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { KeyboardProvider } from 'react-native-keyboard-controller'
import { BottomSheetProvider, useBottomSheet } from '@/hooks/useBottomSheets'
import { queryClient } from '@/libs/react-query'

export { ErrorBoundary } from 'expo-router'

export default function RootLayout() {
	return (
		<FontGuard>
			<GestureHandlerRootView style={{ flex: 1 }}>
				<QueryClientProvider client={queryClient}>
					<StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
					<KeyboardProvider preload>
						<BottomSheetProvider>
							<RootLayoutNav />
							<Toasts overrideDarkMode={true} />
						</BottomSheetProvider>
					</KeyboardProvider>
				</QueryClientProvider>
			</GestureHandlerRootView>
		</FontGuard>
	)
}

function RootLayoutNav() {
	const { isBottomSheetOpen } = useBottomSheet()
	return (
		<Stack screenOptions={{ headerShown: false, contentStyle: { overflow: isBottomSheetOpen ? 'hidden' : 'visible' } }}>
			<Stack.Screen name="(home)/index" />
			<Stack.Screen name="create-quote/index" />
			<Stack.Screen name="quote-details/index" />
		</Stack>
	)
}
