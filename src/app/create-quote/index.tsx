import { Text, View } from 'react-native'
import { BackButton } from '@/components/page/back-button'
import { Page } from '@/components/page/page'
import { Typography } from '@/components/typography'

export default function CreateQuoteScreen() {
	return (
		<Page>
			<View className="w-full flex-row items-center justify-start gap-4 border-gray-200 border-b p-5">
				<BackButton />
				<Typography variant="title-sm" className="flex-1">
					Novo Orçamento
				</Typography>
			</View>
			<View className="gap-5 p-5"></View>
		</Page>
	)
}
