import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { FilterFormType } from '@/components/app/home/filter-drawer'
import { filtersService } from '../filter'

const QUERY_KEY = ['filters']

export function useGetFilters() {
	return useQuery({
		queryKey: QUERY_KEY,
		queryFn: async () => {
			return filtersService.getFiltersFromStorage()
		},
	})
}

export function useMutateFilters() {
	const queryClient = useQueryClient()

	const saveFilters = useMutation({
		mutationFn: async (filters: FilterFormType) => {
			await filtersService.saveFiltersToStorage(filters)
		},
		onMutate: (data) => {
			queryClient.setQueryData(QUERY_KEY, () => data)
		},
	})

	const resetFilters = useMutation({
		mutationFn: async () => {
			await filtersService.clearFiltersFromStorage()
		},
		onMutate: () => {
			queryClient.setQueryData(QUERY_KEY, () => filtersService.DEFAULT_FILTER_VALUES)
		},
	})

	return { saveFilters, resetFilters }
}
