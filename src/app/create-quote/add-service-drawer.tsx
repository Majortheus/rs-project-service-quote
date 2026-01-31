import { useCallback } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { TouchableOpacity, View } from 'react-native'
import * as z from 'zod'
import { CheckMageIcon } from '@/assets/icons/mage-icons/check-mage-icons'
import { MultiplyMageIcon } from '@/assets/icons/mage-icons/multiply-mage-icons'
import { TrashMageIcon } from '@/assets/icons/mage-icons/trash-mage-icons'
import { Button } from '@/components/button'
import { Input } from '@/components/form/input'
import { Typography } from '@/components/typography'
import { useBottomSheet } from '@/hooks/useBottomSheets'

const SERVICE_VALIDATION = z.object({
	id: z.string(),
	title: z.string().min(1, 'Título obrigatório'),
	description: z.string().optional(),
	price: z.coerce.number().nonnegative(),
	quantity: z.coerce.number().int().min(1),
})

export type ServiceFormType = z.infer<typeof SERVICE_VALIDATION>

export const DEFAULT_SERVICE_VALUES: ServiceFormType = {
	id: '',
	title: '',
	description: '',
	price: 0,
	quantity: 1,
}

export function AddServiceDrawer({ initial, setItems }: { initial?: ServiceFormType; setItems: React.Dispatch<React.SetStateAction<ServiceFormType[]>> }) {
	const { closeBottomSheet } = useBottomSheet()

	const form = useForm<ServiceFormType>({
		defaultValues: initial ?? DEFAULT_SERVICE_VALUES,
	})

	const handleSubmit = useCallback(
		(data: ServiceFormType) => {
			if (data.id) {
				setItems((services) => services.map((oldService) => (oldService.id === data.id ? { ...oldService, ...data, price: data.price } : oldService)))
			} else {
				setItems((services) => [{ ...data, id: String(Date.now()) }, ...services])
			}
			closeBottomSheet()
		},
		[closeBottomSheet, setItems],
	)

	const handleDelete = useCallback(() => {
		if (initial?.id) {
			setItems((services) => services.filter((oldService) => oldService.id !== initial.id))
		} else {
			form.reset(DEFAULT_SERVICE_VALUES)
		}
		closeBottomSheet()
	}, [initial, closeBottomSheet, form, setItems])

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
							<Input name="description" placeholder="Descrição (opcional)" />
							<View className="flex-row gap-3">
								<View className="flex-1">
									<Input
										startIcon={() => (
											<Typography variant="title-md" className="mr-2 flex w-5">
												R$
											</Typography>
										)}
										name="price"
										placeholder="Preço"
										keyboardType="numeric"
										container={{
											className: 'items-baseline',
										}}
									/>
								</View>
								<View style={{ width: 96 }}>
									<Input name="quantity" placeholder="Qt" keyboardType="numeric" />
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
