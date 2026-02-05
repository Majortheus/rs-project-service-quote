import { useRouter } from 'expo-router'
import { useMemo } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { ActivityIndicator, FlatList, TouchableOpacity, View } from 'react-native'
import { FilterMageIcon } from '@/assets/icons/mage-icons/filter-mage-icons'
import { SearchMageIcon } from '@/assets/icons/mage-icons/search-mage-icons'
import { FilterDrawer } from '@/components/app/home/filter-drawer'
import { HomeHeader } from '@/components/app/home/home-header'
import { Button } from '@/components/button'
import { Input } from '@/components/form/inputs/input'
import { Page } from '@/components/page/page'
import { Status } from '@/components/status'
import { Typography } from '@/components/typography'
import { useBottomSheet } from '@/hooks/useBottomSheets'
import { useGetFilters } from '@/services/queries/filters-query'
import { useGetQuotes } from '@/services/queries/quotes-query'
import type { Quote } from '@/services/quote'
import { formatMoney } from '@/utils/formatMoney'

export default function HomeScreen() {
	const { openBottomSheet } = useBottomSheet()

	const form = useForm()

	const { data: filters } = useGetFilters()
	const { data: quotes = [], isLoading } = useGetQuotes(filters)

	return (
		<Page>
			<FormProvider {...form}>
				<HomeHeader />
				<View className="flex-1 gap-6 px-5 py-6">
					<View className="w-full flex-row items-center gap-2">
						<View className="flex-1">
							<Input name="search" startIcon={SearchMageIcon} placeholder="Título ou cliente" />
						</View>
						<Button
							startIcon={FilterMageIcon}
							variant={filters?.sort !== 'recent' || (filters?.status && filters?.status.length > 0) ? 'filled' : 'outlined'}
							onPress={() => openBottomSheet(<FilterDrawer />)}
						/>
					</View>
					<View className="flex-1">
						{isLoading ? (
							<View className="flex-1 items-center justify-center">
								<ActivityIndicator size="large" />
							</View>
						) : (
							<FlatList
								data={quotes}
								keyExtractor={(item) => item.id.toString()}
								renderItem={({ item }) => <QuoteItem quote={item} />}
								showsVerticalScrollIndicator={false}
								contentContainerStyle={{ gap: 8, paddingBottom: 8 }}
							/>
						)}
					</View>
				</View>
			</FormProvider>
		</Page>
	)
}

type RenderQuoteProps = {
	quote: Quote
}

function QuoteItem({ quote }: RenderQuoteProps) {
	const router = useRouter()
	const total = useMemo(() => {
		const subtotal = quote.items.reduce((sum, item) => sum + item.price * item.qty, 0)
		const discountAmount = Math.round(((subtotal * quote.discountPct) / 100) * 100) / 100
		return Math.round(Math.max(0, subtotal - discountAmount) * 100) / 100
	}, [quote])

	return (
		<TouchableOpacity
			activeOpacity={0.7}
			onPress={() => router.push({ pathname: '/quote-details', params: { id: quote.id } })}
			className="relative min-h-[82px] w-full flex-row justify-between gap-3 rounded-[10px] border border-gray-200 bg-gray-100 p-4"
		>
			<View className="flex-1 justify-between">
				<Typography variant="title-md">{quote.title}</Typography>
				<Typography variant="text-sm" className="text-gray-600">
					{quote.client}
				</Typography>
			</View>
			<View className="flex-1 items-end justify-end">
				<View className="absolute -top-2 -right-2">
					<Status status={quote.status} />
				</View>
				<View className="flex-row items-baseline gap-1">
					<Typography variant="text-xs">R$</Typography>
					<Typography variant="title-md">{formatMoney(total)}</Typography>
				</View>
			</View>
		</TouchableOpacity>
	)
}
