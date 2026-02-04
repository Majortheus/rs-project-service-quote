import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { TouchableOpacity, View } from 'react-native'
import * as z from 'zod'
import { CheckMageIcon } from '@/assets/icons/mage-icons/check-mage-icons'
import { MultiplyMageIcon } from '@/assets/icons/mage-icons/multiply-mage-icons'
import { TrashMageIcon } from '@/assets/icons/mage-icons/trash-mage-icons'
import { Button } from '@/components/button'
import { Input } from '@/components/form/inputs/input'
import { InputMoney } from '@/components/form/inputs/input-money'
import { Quantity } from '@/components/form/quantity'
import { TextArea } from '@/components/form/textarea'
import { Typography } from '@/components/typography'
import { useBottomSheet } from '@/hooks/useBottomSheets'

export const SERVICE_SCHEMA = z.object({
	id: z.string(),
	title: z.string().min(1, 'Título obrigatório'),
	description: z.string().optional(),
	price: z.coerce.number().nonnegative().min(0.01, 'Preço deve ser maior que zero') as z.ZodNumber,
	qty: z.coerce.number().int().min(1) as z.ZodNumber,
})

export type ServiceFormType = z.infer<typeof SERVICE_SCHEMA>

export const DEFAULT_SERVICE_VALUES: ServiceFormType = {
	id: '',
	title: '',
	description: '',
	price: 0,
	qty: 1,
}

type AddServiceDrawerProps = {
	initial?: ServiceFormType
	onSuccess: (data: ServiceFormType) => void
	onDelete?: () => void
}

export function AddServiceDrawer({ initial, onSuccess, onDelete }: AddServiceDrawerProps) {
	const { closeBottomSheet } = useBottomSheet()

	const form = useForm<ServiceFormType>({
		defaultValues: initial ?? DEFAULT_SERVICE_VALUES,
		resolver: zodResolver(SERVICE_SCHEMA),
	})

	const handleSubmit = useCallback(
		(data: ServiceFormType) => {
			onSuccess({ ...data, id: initial?.id ?? String(Date.now()) })
			closeBottomSheet()
		},
		[closeBottomSheet, onSuccess, initial],
	)

	const handleDelete = useCallback(() => {
		if (initial?.id) {
			onDelete?.()
		} else {
			form.reset(DEFAULT_SERVICE_VALUES)
		}
		closeBottomSheet()
	}, [initial, closeBottomSheet, form, onDelete])

	return (
		<FormProvider {...form}>
			<View className="flex-1 items-center bg-white">
				<View className="w-full max-w-5xl flex-1">
					<View className="w-full items-center">
						<View className="w-full flex-row items-center border-gray-200 border-b p-5">
							<Typography variant="title-sm" className="flex-1">
								Serviço
							</Typography>
							<TouchableOpacity onPress={closeBottomSheet} activeOpacity={0.7}>
								<MultiplyMageIcon />
							</TouchableOpacity>
						</View>
					</View>

					<View className="flex-1 gap-5 border-gray-200 border-b p-5 pb-8">
						<View className="gap-3">
							<Input name="title" placeholder="Título do serviço" />
							<TextArea name="description" placeholder="Descrição (opcional)" />
							<View className="flex-row gap-3">
								<View className="flex-1">
									<InputMoney name="price" placeholder="Preço" />
								</View>
								<View className="w-[112px]">
									<Quantity name="qty" placeholder="Qt" />
								</View>
							</View>
						</View>
					</View>

					<View className="flex-row justify-center gap-3 p-5 pb-10">
						<Button variant="outlined" color="danger" startIcon={TrashMageIcon} onPress={handleDelete}></Button>

						<View className="w-[102px]">
							<Button startIcon={CheckMageIcon} onPress={form.handleSubmit(handleSubmit)}>
								Salvar
							</Button>
						</View>
					</View>
				</View>
			</View>
		</FormProvider>
	)
}
