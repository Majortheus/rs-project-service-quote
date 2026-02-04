import { ActivityIndicator, View } from 'react-native'
import { Page } from '@/components/page/page'

export function QuoteDetailsLoading() {
	return (
		<Page>
			<View className="flex-1 items-center justify-center">
				<ActivityIndicator size="large" />
			</View>
		</Page>
	)
}
