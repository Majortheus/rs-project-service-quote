import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { FormProvider, useForm } from 'react-hook-form'
import { FlatList, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FilterMageIcon } from '@/assets/icons/mage-icons/filter-mage-icons'
import { SearchMageIcon } from '@/assets/icons/mage-icons/search-mage-icons'
import { FilterDrawer } from '@/components/app/home/filter-drawer'
import { HomeHeader } from '@/components/app/home/home-header'
import { Button } from '@/components/button'
import { Input } from '@/components/form/input'
import { Page } from '@/components/page/page'
import { Status, type StatusType } from '@/components/status'
import { Typography } from '@/components/typography'
import { useBottomSheet } from '@/hooks/useBottomSheets'
import { formatMoney } from '@/utils/formatMoney'

type Quote = {
	id: number
	client: string
	title: string
	items: Array<{
		description: string
		qty: number
		price: number
	}>
	discountPct: number
	status: StatusType
	createdAt: string
	updatedAt: string
}

const data: Quote[] = [
	{
		id: 1,
		client: 'Nome do cliente',
		title: 'Título do serviço 1',
		items: [
			{
				description: 'Descrição do item 1',
				qty: 2,
				price: 300.0,
			},
		],
		discountPct: 200,
		status: 'Rascunho',
		createdAt: '2026-01-25T12:27:00',
		updatedAt: '2026-01-25T12:27:00',
	},
	{
		id: 2,
		client: 'Nome do cliente',
		title: 'Título do serviço 2',
		items: [
			{
				description: 'Descrição do item 1',
				qty: 2,
				price: 300.0,
			},
		],
		discountPct: 200,
		status: 'Rascunho',
		createdAt: '2026-01-25T12:27:00',
		updatedAt: '2026-01-25T12:27:00',
	},
	{
		id: 3,
		client: 'Nome do cliente',
		title: 'Título do serviço 3',
		items: [
			{
				description: 'Descrição do item 1',
				qty: 2,
				price: 300.0,
			},
		],
		discountPct: 200,
		status: 'Rascunho',
		createdAt: '2026-01-25T12:27:00',
		updatedAt: '2026-01-25T12:27:00',
	},
	{
		id: 4,
		client: 'Nome do cliente',
		title: 'Título do serviço 4',
		items: [
			{
				description: 'Descrição do item 1',
				qty: 2,
				price: 300.0,
			},
		],
		discountPct: 200,
		status: 'Rascunho',
		createdAt: '2026-01-25T12:27:00',
		updatedAt: '2026-01-25T12:27:00',
	},
	{
		id: 5,
		client: 'Nome do cliente',
		title: 'Título do serviço 5',
		items: [
			{
				description: 'Descrição do item 1',
				qty: 2,
				price: 300.0,
			},
		],
		discountPct: 200,
		status: 'Rascunho',
		createdAt: '2026-01-25T12:27:00',
		updatedAt: '2026-01-25T12:27:00',
	},
	{
		id: 6,
		client: 'Nome do cliente',
		title: 'Título do serviço 6',
		items: [
			{
				description: 'Descrição do item 1',
				qty: 2,
				price: 300.0,
			},
		],
		discountPct: 200,
		status: 'Rascunho',
		createdAt: '2026-01-25T12:27:00',
		updatedAt: '2026-01-25T12:27:00',
	},
	{
		id: 7,
		client: 'Nome do cliente',
		title: 'Título do serviço 7',
		items: [
			{
				description: 'Descrição do item 1',
				qty: 2,
				price: 300.0,
			},
		],
		discountPct: 200,
		status: 'Rascunho',
		createdAt: '2026-01-25T12:27:00',
		updatedAt: '2026-01-25T12:27:00',
	},
	{
		id: 8,
		client: 'Nome do cliente',
		title: 'Título do serviço 8',
		items: [
			{
				description: 'Descrição do item 1',
				qty: 2,
				price: 300.0,
			},
		],
		discountPct: 200,
		status: 'Rascunho',
		createdAt: '2026-01-25T12:27:00',
		updatedAt: '2026-01-25T12:27:00',
	},
	{
		id: 9,
		client: 'Nome do cliente',
		title: 'Título do serviço 9',
		items: [
			{
				description: 'Descrição do item 1',
				qty: 2,
				price: 300.0,
			},
		],
		discountPct: 200,
		status: 'Rascunho',
		createdAt: '2026-01-25T12:27:00',
		updatedAt: '2026-01-25T12:27:00',
	},
	{
		id: 10,
		client: 'Nome do cliente',
		title: 'Título do serviço 10',
		items: [
			{
				description: 'Descrição do item 1',
				qty: 2,
				price: 300.0,
			},
		],
		discountPct: 200,
		status: 'Rascunho',
		createdAt: '2026-01-25T12:27:00',
		updatedAt: '2026-01-25T12:27:00',
	},
	{
		id: 11,
		client: 'Nome do cliente',
		title: 'Título do serviço 11',
		items: [
			{
				description: 'Descrição do item 1',
				qty: 2,
				price: 300.0,
			},
		],
		discountPct: 200,
		status: 'Rascunho',
		createdAt: '2026-01-25T12:27:00',
		updatedAt: '2026-01-25T12:27:00',
	},
	{
		id: 12,
		client: 'Nome do cliente',
		title: 'Título do serviço 12',
		items: [
			{
				description: 'Descrição do item 1',
				qty: 2,
				price: 300.0,
			},
		],
		discountPct: 200,
		status: 'Rascunho',
		createdAt: '2026-01-25T12:27:00',
		updatedAt: '2026-01-25T12:27:00',
	},
	{
		id: 13,
		client: 'Nome do cliente',
		title: 'Título do serviço 13',
		items: [
			{
				description: 'Descrição do item 1',
				qty: 2,
				price: 300.0,
			},
		],
		discountPct: 200,
		status: 'Rascunho',
		createdAt: '2026-01-25T12:27:00',
		updatedAt: '2026-01-25T12:27:00',
	},
]

export default function HomeScreen() {
	const { openBottomSheet } = useBottomSheet()

	const form = useForm()

	return (
		<Page>
			<FormProvider {...form}>
				<HomeHeader />
				<View className="flex-1 gap-6 px-5 py-6">
					<View className="w-full flex-row items-center gap-2">
						<View className="flex-1">
							<Input name="search" startIcon={SearchMageIcon} placeholder="Título ou cliente" />
						</View>
						<Button startIcon={FilterMageIcon} variant="outlined" onPress={() => openBottomSheet(<FilterDrawer />)} />
					</View>
					<View className="flex-1">
						<FlatList
							data={data}
							keyExtractor={(item) => item.id.toString()}
							renderItem={({ item }) => <QuoteItem quote={item} />}
							showsVerticalScrollIndicator={false}
							contentContainerStyle={{ gap: 8, paddingBottom: 8 }}
						/>
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
	return (
		<View className="relative min-h-[82px] w-full flex-row justify-between gap-3 rounded-[10px] border border-gray-200 bg-gray-100 p-4">
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
					<Typography variant="title-md">{formatMoney(quote.items.reduce((sum, item) => sum + item.price * item.qty, 0) - quote.discountPct)}</Typography>
				</View>
			</View>
		</View>
	)
}
