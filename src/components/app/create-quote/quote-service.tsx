import { useCallback } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { View } from 'react-native'
import type { QuoteFormType } from '@/app/create-quote'
import { EditPenMageIcon } from '@/assets/icons/mage-icons/edit-pen-mage-icons'
import { NoteWithTextMageIcon } from '@/assets/icons/mage-icons/note-with-text-mage-icons'
import { PlusMageIcon } from '@/assets/icons/mage-icons/plus-mage-icons'
import { Button } from '@/components/button'
import { FormGroup } from '@/components/form/form-group'
import { Typography } from '@/components/typography'
import { useBottomSheet } from '@/hooks/useBottomSheets'
import { formatMoney } from '@/utils/formatMoney'
import { AddServiceDrawer } from './add-service-drawer'

export function QuoteService() {
	const { openBottomSheet } = useBottomSheet()

	const { control, getFieldState } = useFormContext<QuoteFormType>()
	const { error } = getFieldState('services')
	const servicesArray = useFieldArray({ name: 'services', control: control })

	const handleAddService = useCallback(() => {
		openBottomSheet(<AddServiceDrawer onSuccess={(data) => servicesArray.append(data)} />)
	}, [openBottomSheet, servicesArray])

	const handleEditService = useCallback(
		(itemIndex: number) => {
			openBottomSheet(
				<AddServiceDrawer
					initial={servicesArray.fields[itemIndex]}
					onSuccess={(data) => servicesArray.update(itemIndex, data)}
					onDelete={() => servicesArray.remove(itemIndex)}
				/>,
			)
		},
		[openBottomSheet, servicesArray],
	)

	return (
		<FormGroup title="Serviços inclusos" icon={NoteWithTextMageIcon}>
			<View className="gap-5 p-4">
				{servicesArray.fields.map((service, index) => (
					<QuoteServiceItem
						key={service.id}
						title={service.title}
						description={service.description}
						price={service.price}
						quantity={service.quantity}
						onEdit={() => handleEditService(index)}
					/>
				))}
				<Button startIcon={PlusMageIcon} variant="outlined" onPress={handleAddService}>
					Adicionar serviço
				</Button>
				{error && (
					<Typography variant="text-sm" className="text-red-500">
						{error.message}
					</Typography>
				)}
			</View>
		</FormGroup>
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
