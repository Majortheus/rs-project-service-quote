import { useCallback, useEffect } from 'react'
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
	id: z.string().optional(),
	title: z.string().min(1, 'Título obrigatório'),
	description: z.string().optional(),
	price: z.coerce.number().nonnegative(),
	quantity: z.coerce.number().int().min(1),
})

export type ServiceFormType = z.infer<typeof SERVICE_VALIDATION>

type ServiceFormRaw = {
	id?: string
	title: string
	description?: string
	price: number
	quantity: number
}

export const DEFAULT_SERVICE_VALUES: ServiceFormRaw = {
	title: '',
	description: '',
	price: 0,
	quantity: 1,
}

export function AddServiceDrawer({
	initial,
	onSave,
	onDelete,
}: {
	initial?: Partial<ServiceFormType>
	onSave: (s: ServiceFormType) => void
	onDelete?: (id?: string) => void
}) {
	const { closeBottomSheet } = useBottomSheet()

	const form = useForm<ServiceFormRaw>({
		defaultValues: initial ?? DEFAULT_SERVICE_VALUES,
	})

	const handleSubmit = useCallback(
		(data: ServiceFormRaw) => {
			const parsed = SERVICE_VALIDATION.parse({ ...data })
			onSave(parsed)
			closeBottomSheet()
		},
		[onSave, closeBottomSheet],
	)

	const handleDelete = useCallback(() => {
		if (initial?.id) {
			if (onDelete) onDelete(initial?.id)
		} else {
			form.reset(DEFAULT_SERVICE_VALUES)
		}
		closeBottomSheet()
	}, [onDelete, initial, closeBottomSheet])

	return (
		<FormProvider {...form}>
			<View className="flex-1 items-center bg-white">
				<View className="w-full max-w-5xl flex-1">
					<View className="w-full items-center">
						<View className="my-3 h-1 w-14 rounded-full bg-gray-200" />
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
											<Typography variant="title-md" className="mr-2 self-center">
												R$
											</Typography>
										)}
										name="price"
										placeholder="Preço"
										keyboardType="numeric"
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
