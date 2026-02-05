import { zodResolver } from '@hookform/resolvers/zod'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useCallback, useEffect } from 'react'
import { FormProvider, useForm, useFormContext } from 'react-hook-form'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import z from 'zod'
import { CheckMageIcon } from '@/assets/icons/mage-icons/check-mage-icons'
import { CreditCardMageIcon } from '@/assets/icons/mage-icons/credit-card-mage-icons'
import { ShopMageIcon } from '@/assets/icons/mage-icons/shop-mage-icons'
import { TagMageIcon } from '@/assets/icons/mage-icons/tag-mage-icons'
import { SERVICE_SCHEMA } from '@/components/app/create-quote/add-service-drawer'
import { QuoteService } from '@/components/app/create-quote/quote-service'
import { QuoteDetailsLoading } from '@/components/app/quote-details/loading'
import { QuoteDetailsNotFound } from '@/components/app/quote-details/not-found'
import { Button } from '@/components/button'
import { FormGroup } from '@/components/form/form-group'
import { Input } from '@/components/form/inputs/input'
import { InputPercentage } from '@/components/form/inputs/input-percentage'
import { Radio } from '@/components/form/radio'
import { KeyboardScroll } from '@/components/keyboard-aware-scroll'
import { BackButton } from '@/components/page/back-button'
import { Page } from '@/components/page/page'
import { Status } from '@/components/status'
import { Typography } from '@/components/typography'
import { useGetQuote, useMutateQuotes } from '@/services/queries/quotes-query'
import { type Quote, quotesService } from '@/services/quote'
import { formatMoney } from '@/utils/formatMoney'

const CREATE_QUOTE_SCHEMA = z.object({
	id: z.string(),
	title: z.string().min(1, 'Título obrigatório'),
	client: z.string().min(1, 'Cliente obrigatório'),
	status: z.enum(['draft', 'sent', 'approved', 'rejected']),
	items: z.array(SERVICE_SCHEMA).min(1, 'Adicione ao menos um serviço'),
	discountPct: z.number().min(0).max(100),
})

export type QuoteFormType = z.infer<typeof CREATE_QUOTE_SCHEMA>

export const DEFAULT_CREATE_QUOTE_VALUES: QuoteFormType = {
	id: '',
	title: '',
	client: '',
	status: 'draft',
	items: [],
	discountPct: 0,
}

export default function CreateQuoteScreen() {
	const router = useRouter()

	const { id } = useLocalSearchParams<{ id?: string }>()

	const { data: existingQuote, isLoading: isQuoteLoading } = useGetQuote(id)

	const form = useForm<QuoteFormType>({
		defaultValues: DEFAULT_CREATE_QUOTE_VALUES,
		resolver: zodResolver(CREATE_QUOTE_SCHEMA),
	})

	useEffect(() => {
		if (existingQuote) {
			form.reset({
				id: existingQuote.id,
				title: existingQuote.title,
				client: existingQuote.client,
				status: existingQuote.status,
				items: existingQuote.items.map((it) => ({ ...it })),
				discountPct: existingQuote.discountPct,
			})
		}
	}, [existingQuote, form])

	const { addQuote, updateQuote } = useMutateQuotes()

	const onSubmit = useCallback(
		async (data: QuoteFormType) => {
			try {
				const now = new Date().toISOString()

				if (!data.id) {
					const newQuote: Quote = {
						id: String(Date.now()),
						client: data.client,
						title: data.title,
						items: data.items.map((it) => ({ ...it, qty: Number(it.qty), price: Number(it.price) })),
						discountPct: data.discountPct,
						status: data.status,
						createdAt: now,
						updatedAt: now,
					}

					await addQuote.mutateAsync(newQuote)
				} else {
					const existing = await quotesService.getQuoteById(data.id)
					const createdAt = existing?.createdAt ?? now
					const updatedQuote: Quote = {
						id: data.id,
						client: data.client,
						title: data.title,
						items: data.items.map((it) => ({ ...it, qty: Number(it.qty), price: Number(it.price) })),
						discountPct: data.discountPct,
						status: data.status,
						createdAt,
						updatedAt: now,
					}

					await updateQuote.mutateAsync(updatedQuote)
				}

				router.back()
			} catch (error) {
				console.error('Error saving quote:', error)
			}
		},
		[addQuote, updateQuote, router],
	)

	if (id && isQuoteLoading) return <QuoteDetailsLoading />
	if (id && !isQuoteLoading && !existingQuote) return <QuoteDetailsNotFound />

	return (
		<Page>
			<FormProvider {...form}>
				<View className="w-full flex-row items-center justify-start gap-5 border-gray-200 border-b p-5">
					<BackButton />
					<Typography variant="title-sm" className="flex-1">
						{existingQuote ? 'Editar Orçamento' : 'Novo Orçamento'}
					</Typography>
				</View>
				<KeyboardScroll>
					<View className="gap-5 p-5">
						<GeneralInfo />
						<StatusGroup />
						<QuoteService />
						<Pricing />
					</View>
				</KeyboardScroll>
				<SafeAreaView edges={['bottom']} className="w-full">
					<View className="w-full flex-row items-center justify-center gap-3 border-gray-200 border-t bg-white p-5 pb-10">
						<Button
							className="w-[95px]"
							variant="outlined"
							onPress={() => {
								form.reset()
								router.back()
							}}
						>
							Cancelar
						</Button>
						<Button className="w-[102px]" startIcon={CheckMageIcon} onPress={form.handleSubmit(onSubmit)}>
							Salvar
						</Button>
					</View>
				</SafeAreaView>
			</FormProvider>
		</Page>
	)
}

function GeneralInfo() {
	return (
		<FormGroup title="Informações gerais" icon={ShopMageIcon}>
			<View className="gap-2 p-4">
				<Input name="title" placeholder="Título" />
				<Input name="client" placeholder="Cliente" />
			</View>
		</FormGroup>
	)
}

function StatusGroup() {
	return (
		<FormGroup title="Status" icon={TagMageIcon}>
			<View className="flex-row p-4">
				<View className="w-full flex-1 grow gap-3">
					<Radio name="status" value="draft">
						<Status status="draft" />
					</Radio>
					<Radio name="status" value="sent">
						<Status status="sent" />
					</Radio>
				</View>
				<View className="w-full flex-1 grow gap-3">
					<Radio name="status" value="approved">
						<Status status="approved" />
					</Radio>
					<Radio name="status" value="rejected">
						<Status status="rejected" />
					</Radio>
				</View>
			</View>
		</FormGroup>
	)
}

function Pricing() {
	const { watch } = useFormContext<QuoteFormType>()
	const items = watch('items') ?? []
	const discountPct = watch('discountPct') ?? 0

	const subtotal = items.reduce((sum, s) => {
		const qty = s.qty ? Number(s.qty) : 1
		return sum + (s.price ?? 0) * (qty || 1)
	}, 0)

	const itemCount = items.reduce((sum, s) => sum + (s.qty ? Number(s.qty) : 1), 0)
	const discountAmount = Math.round(((subtotal * discountPct) / 100) * 100) / 100
	const total = Math.round(Math.max(0, subtotal - discountAmount) * 100) / 100

	return (
		<FormGroup title="Investimento" icon={CreditCardMageIcon}>
			<View className="gap-3 p-4 pl-5">
				<View className="flex-row items-center justify-between">
					<Typography variant="text-sm">Subtotal</Typography>

					<View className="flex-row items-center gap-3">
						<Typography variant="text-xs" className="text-gray-600">
							{itemCount} itens
						</Typography>

						<View className="flex-row items-baseline gap-1">
							<Typography variant="text-xs">R$</Typography>
							<Typography variant="title-sm">{formatMoney(subtotal)}</Typography>
						</View>
					</View>
				</View>

				<View className="flex-row items-center justify-between">
					<View className="flex-1 flex-row items-center gap-2">
						<Typography variant="text-sm">Desconto</Typography>

						<View className="flex-1">
							<InputPercentage name="discountPct" />
						</View>
					</View>
					<View className="flex-1 flex-row items-baseline justify-end gap-1">
						<Typography variant="text-xs" className="text-danger-base">
							- R$
						</Typography>
						<Typography variant="text-sm" className="text-danger-base">
							{formatMoney(discountAmount)}
						</Typography>
					</View>
				</View>
			</View>
			<View className="flex-row items-center justify-between border-gray-200 border-t bg-gray-100 px-5 py-4">
				<Typography variant="title-sm">Valor total</Typography>
				<View className="items-end">
					{discountPct > 0 && (
						<Typography variant="text-xs" className="text-gray-600 line-through">
							R$ {formatMoney(subtotal)}
						</Typography>
					)}
					<View className="flex-row items-baseline gap-1">
						<Typography variant="text-xs">R$</Typography>
						<Typography variant="title-lg">{formatMoney(total)}</Typography>
					</View>
				</View>
			</View>
		</FormGroup>
	)
}
