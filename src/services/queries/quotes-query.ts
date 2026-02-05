import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { FilterFormType } from '@/components/app/home/filter-drawer'
import type { Quote } from '@/services/quote'
import { quotesService } from '@/services/quote'

const QUERY_KEY_QUOTES = ['quotes']
const QUERY_KEY_QUOTE = ['quote']

const NO_FILTER_KEY = [...QUERY_KEY_QUOTES, undefined]

export function useGetQuotes(filters?: FilterFormType) {
	return useQuery({
		queryKey: [...QUERY_KEY_QUOTES, filters],
		queryFn: async () => {
			return quotesService.getQuotes(filters)
		},
	})
}

export function useGetQuote(id?: string) {
	return useQuery({
		queryKey: [...QUERY_KEY_QUOTE, id],
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
			const previousList = queryClient.getQueryData<Quote[]>(NO_FILTER_KEY) ?? []
			queryClient.setQueryData<Quote[]>(NO_FILTER_KEY, (old = []) => [...old, newQuote])

			const previousSingle = queryClient.getQueryData<Quote | null>([...QUERY_KEY_QUOTE, newQuote.id]) ?? null
			queryClient.setQueryData([...QUERY_KEY_QUOTE, newQuote.id], newQuote)

			return { previousList, previousSingle }
		},
		onError: (_err, _newQuote, context) => {
			if (context?.previousList) {
				queryClient.setQueryData(NO_FILTER_KEY, context.previousList)
			}
			if (context?.previousSingle) {
				queryClient.setQueryData([...QUERY_KEY_QUOTE, context.previousSingle.id], context.previousSingle)
			}
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: QUERY_KEY_QUOTES })
		},
	})

	const updateQuote = useMutation({
		mutationFn: async (quote: Quote) => {
			const next = await quotesService.updateQuote(quote)
			return next
		},
		onMutate: async (updated: Quote) => {
			const previousList = queryClient.getQueryData<Quote[]>(NO_FILTER_KEY) ?? []
			queryClient.setQueryData<Quote[]>(NO_FILTER_KEY, (old = []) => old.map((q) => (q.id === updated.id ? updated : q)))

			const previousSingle = queryClient.getQueryData<Quote | null>([...QUERY_KEY_QUOTE, updated.id]) ?? null
			queryClient.setQueryData([...QUERY_KEY_QUOTE, updated.id], updated)

			return { previousList, previousSingle }
		},
		onError: (_err, _updated, context) => {
			if (context?.previousList) {
				queryClient.setQueryData(NO_FILTER_KEY, context.previousList)
			}
			if (context?.previousSingle) {
				queryClient.setQueryData([...QUERY_KEY_QUOTE, context.previousSingle.id], context.previousSingle)
			}
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: QUERY_KEY_QUOTES })
		},
	})

	const deleteQuote = useMutation({
		mutationFn: async (id: string) => {
			const next = await quotesService.deleteQuoteById(id)
			return next
		},
		onMutate: async (id: string) => {
			const previousList = queryClient.getQueryData<Quote[]>(NO_FILTER_KEY) ?? []
			queryClient.setQueryData<Quote[]>(NO_FILTER_KEY, (old = []) => old.filter((q) => q.id !== id))

			const previousSingle = queryClient.getQueryData<Quote | null>([...QUERY_KEY_QUOTE, id]) ?? null
			queryClient.removeQueries({ queryKey: [...QUERY_KEY_QUOTE, id] })

			return { previousList, previousSingle }
		},
		onError: (_err, _id, context) => {
			if (context?.previousList) {
				queryClient.setQueryData(NO_FILTER_KEY, context.previousList)
			}
			if (context?.previousSingle) {
				queryClient.setQueryData([...QUERY_KEY_QUOTE, context.previousSingle.id], context.previousSingle)
			}
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: QUERY_KEY_QUOTES })
		},
	})

	return { addQuote, updateQuote, deleteQuote }
}
