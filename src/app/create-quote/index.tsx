import { Controller, FormProvider, useForm, useFormContext } from 'react-hook-form'
import { TextInput, View } from 'react-native'
import z from 'zod'
import { CreditCardMageIcon } from '@/assets/icons/mage-icons/credit-card-mage-icons'
import { ShopMageIcon } from '@/assets/icons/mage-icons/shop-mage-icons'
import { TagMageIcon } from '@/assets/icons/mage-icons/tag-mage-icons'
import { SERVICE_VALIDATION } from '@/components/app/create-quote/add-service-drawer'
import { QuoteService } from '@/components/app/create-quote/quote-service'
import { FormGroup } from '@/components/form/form-group'
import { Input } from '@/components/form/input'
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
	services: z.array(SERVICE_VALIDATION),
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
	const { watch, control } = useFormContext<CreateQuoteFormType>()
	const services = watch('services') ?? []
	const discount = watch('discount') ?? 0

	const subtotal = services.reduce((sum, s) => {
		const qty = s.quantity ? Number(s.quantity) : 1
		return sum + (s.price ?? 0) * (qty || 1)
	}, 0)

	const itemCount = services.reduce((sum, s) => sum + (s.quantity ? Number(s.quantity) : 1), 0)

	const percent = Math.min(Math.max(0, discount), 100)
	const discountAmount = Math.round(((subtotal * percent) / 100) * 100) / 100
	const total = Math.round(Math.max(0, subtotal - discountAmount) * 100) / 100

	return (
		<FormGroup title="Investimento" icon={CreditCardMageIcon}>
			<View className="gap-2 p-4">
				<View className="flex-row items-center justify-between">
					<Typography variant="text-sm" className="text-gray-500">
						Subtotal
					</Typography>

					<View className="flex-row items-center gap-3">
						<Typography variant="text-sm" className="text-gray-500">
							{itemCount} itens
						</Typography>

						<View className="flex-row items-baseline gap-1">
							<Typography variant="text-xs">R$</Typography>
							<Typography variant="title-md">{formatMoney(subtotal)}</Typography>
						</View>
					</View>
				</View>

				<View className="flex-row items-center justify-between">
					<Typography variant="text-sm" className="text-gray-500">
						Desconto
					</Typography>

					<View className="flex-row items-center gap-3">
						<Controller
							control={control}
							name="discount"
							render={({ field: { onChange, value } }) => {
								const display = value !== undefined ? String(value) : ''
								return (
									<View className="h-12 flex-row items-center rounded-full border border-gray-300 bg-gray-100 px-3">
										<TextInput
											className="flex-1 text-base text-gray-700"
											style={{ textAlign: 'right' }}
											keyboardType="numeric"
											placeholder="0"
											onChange={(e) => {
												const raw = e.nativeEvent.text.replace(/,/g, '.')
												const num = Number(raw.replace(/[^0-9.]/g, ''))
												onChange(Number.isNaN(num) ? 0 : num)
											}}
											value={display}
										/>
										<View className="pr-1 pl-2">
											<Typography variant="text-sm" className="text-gray-500">
												%
											</Typography>
										</View>
									</View>
								)
							}}
						/>

						<View>
							<Typography variant="text-sm" className="text-danger-base">
								- R$ {formatMoney(discountAmount)}
							</Typography>
						</View>
					</View>
				</View>

				<View className="flex-row items-center justify-between border-gray-100 border-t pt-3">
					<Typography variant="title-sm">Valor total</Typography>
					<View className="items-end">
						<Typography variant="text-sm" className="text-gray-500 line-through">
							R$ {formatMoney(subtotal)}
						</Typography>
						<View className="flex-row items-baseline gap-1">
							<Typography variant="text-xs">R$</Typography>
							<Typography variant="title-md" className="text-purple-base">
								{formatMoney(total)}
							</Typography>
						</View>
					</View>
				</View>
			</View>
		</FormGroup>
	)
}
