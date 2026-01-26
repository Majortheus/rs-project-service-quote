import { useRouter } from 'expo-router'
import { TouchableOpacity } from 'react-native'
import { ChevronLeftMageIcon } from '@/assets/icons/mage-icons/chevron-left-mage-icons'

export function BackButton() {
	const router = useRouter()
	return (
		<TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
			<ChevronLeftMageIcon />
		</TouchableOpacity>
	)
}
