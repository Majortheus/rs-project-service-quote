import { useLocalSearchParams } from 'expo-router'
import { QuoteDetailsLoading } from '@/components/app/quote-details/loading'
import { QuoteDetailsNotFound } from '@/components/app/quote-details/not-found'
import { QuoteDetailsView } from '@/components/app/quote-details/quote-view'
import { useGetQuote } from '@/services/queries/quotes-query'

export default function QuoteDetailsScreen() {
	const { id } = useLocalSearchParams<{ id?: string }>()

	const { data: quote, isLoading } = useGetQuote(id)

	if (isLoading) return <QuoteDetailsLoading />

	if (!quote) return <QuoteDetailsNotFound />

	return <QuoteDetailsView quote={quote} />
}
