import { useRouter } from 'expo-router'
import { useMemo } from 'react'
import { View } from 'react-native'
import { PlusMageIcon } from '@/assets/icons/mage-icons/plus-mage-icons'
import { Button } from '@/components/button'
import { Typography } from '@/components/typography'
import { useGetQuotes } from '@/services/queries/quotes-query'

export function HomeHeader() {
	const router = useRouter()

	const { data: quotes = [] } = useGetQuotes()

	const draftCount = useMemo(() => quotes.filter((q) => q.status === 'draft').length, [quotes])

	return (
		<View className="w-full flex-row items-center justify-between border-gray-200 border-b p-5">
			<View className="gap-0.5">
				<Typography variant="title-lg" className="text-purple-base">
					Orçamentos
				</Typography>
				{draftCount >= 1 && (
					<Typography variant="text-sm" className="text-gray-500">
						Você tem {draftCount} itens em rascunho
					</Typography>
				)}
			</View>
			<View className="max-w-[98px] flex-1">
				<Button startIcon={PlusMageIcon} onPress={() => router.push('/create-quote')}>
					Novo
				</Button>
			</View>
		</View>
	)
}
