import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { Quote } from '@/services/quote'
import { quotesService } from '@/services/quote'

const QUERY_KEY = ['quotes']

export function useGetQuotes() {
	return useQuery({
		queryKey: QUERY_KEY,
		queryFn: async () => {
			return quotesService.getQuotesFromStorage()
		},
	})
}

export function useMutateQuotes() {
	const queryClient = useQueryClient()

	const addQuote = useMutation({
		mutationFn: async (quote: Quote) => {
			const next = await quotesService.addQuote(quote)
			return next
		},
		onSuccess: (data) => {
			queryClient.setQueryData(QUERY_KEY, () => data)
		},
	})

	const updateQuote = useMutation({
		mutationFn: async (quote: Quote) => {
			const next = await quotesService.updateQuote(quote)
			return next
		},
		onSuccess: (data) => {
			queryClient.setQueryData(QUERY_KEY, () => data)
		},
	})

	const resetQuotes = useMutation({
		mutationFn: async () => {
			await quotesService.clearQuotesFromStorage()
		},
		onMutate: () => {
			queryClient.setQueryData(QUERY_KEY, () => quotesService.DEFAULT_QUOTES)
		},
	})

	return { addQuote, updateQuote, resetQuotes }
}
