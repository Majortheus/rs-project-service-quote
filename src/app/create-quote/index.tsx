import { useCallback, useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { ScrollView, View } from 'react-native'
import { EditPenMageIcon } from '@/assets/icons/mage-icons/edit-pen-mage-icons'
import { NoteWithTextMageIcon } from '@/assets/icons/mage-icons/note-with-text-mage-icons'
import { PlusMageIcon } from '@/assets/icons/mage-icons/plus-mage-icons'
import { ShopMageIcon } from '@/assets/icons/mage-icons/shop-mage-icons'
import { TagMageIcon } from '@/assets/icons/mage-icons/tag-mage-icons'
import { Button } from '@/components/button'
import { FormGroup } from '@/components/form/form-group'
import { Input } from '@/components/form/input'
import { Radio } from '@/components/form/radio'
import { BackButton } from '@/components/page/back-button'
import { Page } from '@/components/page/page'
import { Status } from '@/components/status'
import { Typography } from '@/components/typography'
import { useBottomSheet } from '@/hooks/useBottomSheets'
import { formatMoney } from '@/utils/formatMoney'
import { AddServiceDrawer } from './add-service-drawer'

const initialItems: {
	id: string
	title: string
	description?: string
	price: number
	quantity: number
}[] = [
	{
		id: 'design-interfaces-1',
		title: 'Design de interfaces',
		description: 'Criação de wireframes e protótipos de alta fidelidade',
		price: 3847.5,
		quantity: 1,
	},
	{
		id: 'implementation-support-1',
		title: 'Implantação e suporte',
		description: 'Publicação nas lojas de aplicativos e suporte técnico',
		price: 3847.5,
		quantity: 1,
	},
]

export default function CreateQuoteScreen() {
	const form = useForm()
	const [items, setItems] = useState(initialItems)
	const { openBottomSheet } = useBottomSheet()

	const handleAddService = useCallback(() => {
		openBottomSheet(<AddServiceDrawer setItems={setItems} />)
	}, [openBottomSheet])

	const handleEditService = useCallback(
		(itemId: string) => {
			const item = items.find((i) => i.id === itemId)
			if (!item) return
			openBottomSheet(<AddServiceDrawer initial={item} setItems={setItems} />)
		},
		[items, openBottomSheet],
	)

	useEffect(() => {
		openBottomSheet(<AddServiceDrawer setItems={setItems} />)
	}, [openBottomSheet])

	return (
		<Page>
			<FormProvider {...form}>
				<View className="w-full flex-row items-center justify-start gap-5 border-gray-200 border-b p-5">
					<BackButton />
					<Typography variant="title-sm" className="flex-1">
						Novo Orçamento
					</Typography>
				</View>
				<ScrollView className="flex-1 p-5">
					<View className="gap-5">
						<FormGroup title="Informações gerais" icon={ShopMageIcon}>
							<View className="flex-1 gap-2 p-4">
								<Input name="title" placeholder="Título" />
								<Input name="client" placeholder="Cliente" />
							</View>
						</FormGroup>
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
						<FormGroup title="Serviços inclusos" icon={NoteWithTextMageIcon}>
							<View className="gap-5 p-4">
								{items.map((item) => (
									<QuoteServiceItem
										key={item.id}
										title={item.title}
										description={item.description}
										price={item.price}
										quantity={item.quantity}
										onEdit={() => handleEditService(item.id)}
									/>
								))}
								<Button startIcon={PlusMageIcon} variant="outlined" onPress={handleAddService}>
									Adicionar serviço
								</Button>
							</View>
						</FormGroup>
						<FormGroup title="Informações gerais" icon={ShopMageIcon}>
							<View className="flex-1 gap-2 p-4">
								<Input name="title" placeholder="Título" />
								<Input name="client" placeholder="Cliente" />
							</View>
						</FormGroup>
						<FormGroup title="Informações gerais" icon={ShopMageIcon}>
							<View className="flex-1 gap-2 p-4">
								<Input name="title" placeholder="Título" />
								<Input name="client" placeholder="Cliente" />
							</View>
						</FormGroup>
					</View>
				</ScrollView>
			</FormProvider>
		</Page>
	)
}
type QuoteServiceItemProps = {
	title: string
	description?: string
	price: number
	quantity?: number | string
	onEdit?: () => void
}

function QuoteServiceItem({ title, description, price, quantity = 1, onEdit }: QuoteServiceItemProps) {
	return (
		<View className="flex-row gap-4">
			<View className="flex-1 gap-0.5">
				<Typography variant="title-sm" truncate>
					{title}
				</Typography>
				{description ? (
					<Typography variant="text-xs" truncate className="text-gray-500">
						{description}
					</Typography>
				) : null}
			</View>
			<View className="items-end gap-0.5">
				<View className="flex-row items-baseline gap-1">
					<Typography variant="text-xs">R$</Typography>
					<Typography variant="title-md">{formatMoney(price)}</Typography>
				</View>
				<View>
					<Typography variant="text-xs" className="text-gray-500">
						Qt: {quantity}
					</Typography>
				</View>
			</View>
			<View>
				<Button startIcon={EditPenMageIcon} variant="ghost" onPress={onEdit} />
			</View>
		</View>
	)
}
