import { useCallback, useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { TouchableOpacity, View } from 'react-native'
import * as z from 'zod'
import { CheckMageIcon } from '@/assets/icons/mage-icons/check-mage-icons'
import { MultiplyMageIcon } from '@/assets/icons/mage-icons/multiply-mage-icons'
import { Button } from '@/components/button'
import { Checkbox } from '@/components/form/checkbox'
import { Radio } from '@/components/form/radio'
import { Status } from '@/components/status'
import { Typography } from '@/components/typography'
import { useBottomSheet } from '@/hooks/useBottomSheets'
import { filtersService } from '@/services/filter'
import { useGetFilters, useMutateFilters } from '@/services/queries/filters-query'

const FILTER_VALIDATION = z.object({
	status: z.array(z.enum(['draft', 'sent', 'approved', 'rejected'])).optional(),
	sort: z.enum(['recent', 'oldest', 'highest', 'lowest']).default('recent'),
})

export type FilterFormType = z.infer<typeof FILTER_VALIDATION>

export function FilterDrawer() {
	const { closeBottomSheet } = useBottomSheet()

	const { data: filters } = useGetFilters()
	const { saveFilters, resetFilters } = useMutateFilters()

	const form = useForm<FilterFormType>({
		defaultValues: filtersService.DEFAULT_FILTER_VALUES,
	})

	useEffect(() => {
		if (filters) {
			form.reset(filters)
		}
	}, [filters, form])

	const onSubmit = useCallback(
		(data: FilterFormType) => {
			saveFilters.mutate(data)
			closeBottomSheet()
		},
		[closeBottomSheet, saveFilters],
	)

	const onReset = useCallback(() => {
		form.reset(filtersService.DEFAULT_FILTER_VALUES)
		resetFilters.mutate()
		closeBottomSheet()
	}, [form, resetFilters, closeBottomSheet])

	return (
		<FormProvider {...form}>
			<View className="flex-1 items-center bg-white">
				<View className="max-h-screen w-full max-w-5xl">
					<View className="w-full flex-row items-center border-gray-200 border-b p-5">
						<Typography variant="title-sm" className="flex-1">
							Filtrar e ordenar
						</Typography>
						<TouchableOpacity onPress={closeBottomSheet} activeOpacity={0.7}>
							<MultiplyMageIcon className="ml-auto" />
						</TouchableOpacity>
					</View>
					<View className="gap-5 border-gray-200 border-b p-5 pb-8">
						<StatusFilter />
						<SortFilter />
					</View>
					<View className="flex-row justify-center gap-3 p-5 pb-10">
						<View className="w-[127px]">
							<Button variant="outlined" onPress={onReset}>
								Resetar filtros
							</Button>
						</View>
						<View className="w-[108px]">
							<Button startIcon={CheckMageIcon} onPress={form.handleSubmit(onSubmit)}>
								Aplicar
							</Button>
						</View>
					</View>
				</View>
			</View>
		</FormProvider>
	)
}

function StatusFilter() {
	return (
		<View className="gap-4">
			<Typography variant="text-xs" className="text-gray-500">
				Status
			</Typography>
			<View className="gap-3">
				<Checkbox name="status" value="draft">
					<Status status="draft" />
				</Checkbox>
				<Checkbox name="status" value="sent">
					<Status status="sent" />
				</Checkbox>
				<Checkbox name="status" value="approved">
					<Status status="approved" />
				</Checkbox>
				<Checkbox name="status" value="rejected">
					<Status status="rejected" />
				</Checkbox>
			</View>
		</View>
	)
}

function SortFilter() {
	return (
		<View className="gap-4">
			<Typography variant="text-xs" className="text-gray-500">
				Ordenação
			</Typography>
			<View className="gap-3">
				<Radio name="sort" value="recent">
					Mais recente
				</Radio>
				<Radio name="sort" value="oldest">
					Mais antigo
				</Radio>
				<Radio name="sort" value="highest">
					Maior valor
				</Radio>
				<Radio name="sort" value="lowest">
					Menor valor
				</Radio>
			</View>
		</View>
	)
}
