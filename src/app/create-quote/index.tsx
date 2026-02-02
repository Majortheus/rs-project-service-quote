import { FormProvider, useForm } from 'react-hook-form'
import { View } from 'react-native'
import z from 'zod'
import { CreditCardMageIcon } from '@/assets/icons/mage-icons/credit-card-mage-icons'
import { ShopMageIcon } from '@/assets/icons/mage-icons/shop-mage-icons'
import { TagMageIcon } from '@/assets/icons/mage-icons/tag-mage-icons'
import { QuoteService } from '@/components/app/create-quote/quote-service'
import { FormGroup } from '@/components/form/form-group'
import { Input } from '@/components/form/input'
import { Radio } from '@/components/form/radio'
import { KeyboardScroll } from '@/components/keyboard-aware-scroll'
import { BackButton } from '@/components/page/back-button'
import { Page } from '@/components/page/page'
import { Status } from '@/components/status'
import { Typography } from '@/components/typography'
import { SERVICE_VALIDATION } from '../../components/app/create-quote/add-service-drawer'

const CREATE_QUOTE_VALIDATION = z.object({
	id: z.string(),
	title: z.string().min(1, 'Título obrigatório'),
	client: z.string().min(1, 'Cliente obrigatório'),
	status: z.enum(['draft', 'sent', 'approved', 'rejected']),
	services: z.array(SERVICE_VALIDATION),
})

export type CreateQuoteFormType = z.infer<typeof CREATE_QUOTE_VALIDATION>

export const DEFAULT_CREATE_QUOTE_VALUES: CreateQuoteFormType = {
	id: '',
	title: '',
	client: '',
	status: 'draft',
	services: [],
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
						<FormGroup title="Investimento" icon={CreditCardMageIcon}>
							<View className="gap-2 p-4">
								{/* <Input name="title" placeholder="Título" /> */}
								{/* <Input name="client" placeholder="Cliente" /> */}
							</View>
						</FormGroup>
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
