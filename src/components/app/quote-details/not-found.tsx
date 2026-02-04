import { View } from 'react-native'
import { BackButton } from '@/components/page/back-button'
import { Page } from '@/components/page/page'
import { Typography } from '@/components/typography'

export function QuoteDetailsNotFound() {
	return (
		<Page>
			<View className="w-full flex-row items-center justify-start gap-5 border-gray-200 border-b p-5">
				<BackButton />
				<Typography variant="title-sm" className="flex-1">
					Orçamento não encontrado
				</Typography>
			</View>
		</Page>
	)
}
