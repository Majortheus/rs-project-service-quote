import FontAwesome from '@expo/vector-icons/FontAwesome'
import { useFonts } from 'expo-font'
import { SplashScreen } from 'expo-router'
import { useEffect } from 'react'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

type FontGuardProps = {
	children: React.ReactNode
}

export function FontGuard({ children }: FontGuardProps) {
	const [loaded, error] = useFonts({
		'Lato-Thin': require('../../assets/fonts/Lato-Thin.ttf'),
		'Lato-ThinItalic': require('../../assets/fonts/Lato-ThinItalic.ttf'),
		'Lato-Light': require('../../assets/fonts/Lato-Light.ttf'),
		'Lato-LightItalic': require('../../assets/fonts/Lato-LightItalic.ttf'),
		'Lato-Regular': require('../../assets/fonts/Lato-Regular.ttf'),
		'Lato-Italic': require('../../assets/fonts/Lato-Italic.ttf'),
		'Lato-Bold': require('../../assets/fonts/Lato-Bold.ttf'),
		'Lato-BoldItalic': require('../../assets/fonts/Lato-BoldItalic.ttf'),
		'Lato-Black': require('../../assets/fonts/Lato-Black.ttf'),
		'Lato-BlackItalic': require('../../assets/fonts/Lato-BlackItalic.ttf'),
		...FontAwesome.font,
	})

	useEffect(() => {
		if (error) throw error
	}, [error])

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync()
		}
	}, [loaded])

	if (!loaded) {
		return null
	}

	return children
}
