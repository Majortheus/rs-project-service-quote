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

export function useGetQuote(id?: string) {
	return useQuery({
		queryKey: [...QUERY_KEY, id],
		queryFn: async () => {
			if (!id) return null
			return quotesService.getQuoteById(String(id))
		},
		enabled: !!id,
	})
}

export function useMutateQuotes() {
	const queryClient = useQueryClient()

	const addQuote = useMutation({
		mutationFn: async (quote: Quote) => {
			const next = await quotesService.addQuote(quote)
			return next
		},
		onMutate: async (newQuote: Quote) => {
			await queryClient.cancelQueries({ queryKey: QUERY_KEY })
			const previous = queryClient.getQueryData<Quote[]>(QUERY_KEY) ?? []
			queryClient.setQueryData<Quote[]>(QUERY_KEY, (old = []) => [...old, newQuote])
			return { previous }
		},
		onError: (_err, _newQuote, context) => {
			if (context?.previous) {
				queryClient.setQueryData(QUERY_KEY, context.previous)
			}
		},
	})

	const updateQuote = useMutation({
		mutationFn: async (quote: Quote) => {
			const next = await quotesService.updateQuote(quote)
			return next
		},
		onMutate: async (updated: Quote) => {
			await queryClient.cancelQueries({ queryKey: QUERY_KEY })
			const previous = queryClient.getQueryData<Quote[]>(QUERY_KEY) ?? []
			queryClient.setQueryData<Quote[]>(QUERY_KEY, (old = []) => old.map((q) => (q.id === updated.id ? updated : q)))
			return { previous }
		},
		onError: (_err, _updated, context) => {
			if (context?.previous) {
				queryClient.setQueryData(QUERY_KEY, context.previous)
			}
		},
	})

	const resetQuotes = useMutation({
		mutationFn: async () => {
			await quotesService.clearQuotesFromStorage()
		},
		onMutate: async () => {
			await queryClient.cancelQueries({ queryKey: QUERY_KEY })
			const previous = queryClient.getQueryData<Quote[]>(QUERY_KEY) ?? []
			queryClient.setQueryData(QUERY_KEY, () => [])
			return { previous }
		},
		onError: (_err, _vars, context) => {
			if (context?.previous) {
				queryClient.setQueryData(QUERY_KEY, context.previous)
			}
		},
	})

	const deleteQuote = useMutation({
		mutationFn: async (id: string) => {
			const next = await quotesService.deleteQuoteById(id)
			return next
		},
		onMutate: async (id: string) => {
			await queryClient.cancelQueries({ queryKey: QUERY_KEY })
			const previous = queryClient.getQueryData<Quote[]>(QUERY_KEY) ?? []
			queryClient.setQueryData<Quote[]>(QUERY_KEY, (old = []) => old.filter((q) => q.id !== id))
			return { previous }
		},
		onError: (_err, _id, context: any) => {
			if (context?.previous) {
				queryClient.setQueryData(QUERY_KEY, context.previous)
			}
		},
	})

	return { addQuote, updateQuote, resetQuotes, deleteQuote }
}
