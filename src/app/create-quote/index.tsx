import { useCallback } from 'react'
import { FormProvider, useForm, useFormContext } from 'react-hook-form'
import { View } from 'react-native'
import z from 'zod'
import { CheckMageIcon } from '@/assets/icons/mage-icons/check-mage-icons'
import { CreditCardMageIcon } from '@/assets/icons/mage-icons/credit-card-mage-icons'
import { ShopMageIcon } from '@/assets/icons/mage-icons/shop-mage-icons'
import { TagMageIcon } from '@/assets/icons/mage-icons/tag-mage-icons'
import { SERVICE_SCHEMA } from '@/components/app/create-quote/add-service-drawer'
import { QuoteService } from '@/components/app/create-quote/quote-service'
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
import { formatMoney } from '@/utils/formatMoney'

const CREATE_QUOTE_VALIDATION = z.object({
	id: z.string(),
	title: z.string().min(1, 'Título obrigatório'),
	client: z.string().min(1, 'Cliente obrigatório'),
	status: z.enum(['draft', 'sent', 'approved', 'rejected']),
	services: z.array(SERVICE_SCHEMA),
	discount: z.number().min(0).max(100).default(0),
})

export type CreateQuoteFormType = z.infer<typeof CREATE_QUOTE_VALIDATION>

export const DEFAULT_CREATE_QUOTE_VALUES: CreateQuoteFormType = {
	id: '',
	title: '',
	client: '',
	status: 'draft',
	services: [],
	discount: 0,
}

export default function CreateQuoteScreen() {
	const form = useForm<CreateQuoteFormType>({
		defaultValues: DEFAULT_CREATE_QUOTE_VALUES,
	})

	const onSubmit = useCallback((data: CreateQuoteFormType) => {
		console.log('Submitting quote:', data)
	}, [])

	return (
		<Page>
			<FormProvider {...form}>
				<View className="w-full flex-row items-center justify-start gap-5 border-gray-200 border-b p-5">
					<BackButton />
					<Typography variant="title-sm" className="flex-1">
						Novo Orçamento
					</Typography>
				</View>
				<KeyboardScroll>
					<View className="gap-5 p-5">
						<GeneralInfo />
						<StatusGroup />
						<QuoteService />
						<Pricing />
					</View>
					<View className="sticky bottom-0 flex-1 flex-row justify-center gap-3 border-gray-200 border-t p-5 pb-20">
						<Button className="w-[95px]" variant="outlined">
							Cancelar
						</Button>
						<Button className="w-[102px]" startIcon={CheckMageIcon} onPress={form.handleSubmit(onSubmit)}>
							Salvar
						</Button>
					</View>
				</KeyboardScroll>
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
						<Status status="Rascunho" />
					</Radio>
					<Radio name="status" value="sent">
						<Status status="Enviado" />
					</Radio>
				</View>
				<View className="w-full flex-1 grow gap-3">
					<Radio name="status" value="approved">
						<Status status="Aprovado" />
					</Radio>
					<Radio name="status" value="rejected">
						<Status status="Recusado" />
					</Radio>
				</View>
			</View>
		</FormGroup>
	)
}

function Pricing() {
	const { watch } = useFormContext<CreateQuoteFormType>()
	const services = watch('services') ?? []
	const discount = watch('discount') ?? 0

	const subtotal = services.reduce((sum, s) => {
		const qty = s.quantity ? Number(s.quantity) : 1
		return sum + (s.price ?? 0) * (qty || 1)
	}, 0)

	const itemCount = services.reduce((sum, s) => sum + (s.quantity ? Number(s.quantity) : 1), 0)

	const discountAmount = Math.round(((subtotal * discount) / 100) * 100) / 100
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
							<InputPercentage name="discount" />
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
					{discount > 0 && (
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
