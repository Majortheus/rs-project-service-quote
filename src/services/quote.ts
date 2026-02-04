import AsyncStorage from '@react-native-async-storage/async-storage'
import type { StatusType } from '@/components/status'

const ASYNC_STORAGE_KEY = '@SERVICE-QUOTE:quotes'

export type Quote = {
	id: string
	client: string
	title: string
	items: {
		id: string
		title: string
		description: string
		qty: number
		price: number
	}[]
	discountPct: number
	status: StatusType
	createdAt: string
	updatedAt: string
}

export const DEFAULT_QUOTES: Quote[] = [
	{
		id: '1',
		client: 'Nome do cliente',
		title: 'Título do serviço 1',
		items: [
			{
				id: '1',
				title: 'Serviço 1',
				description: 'Descrição do item 1',
				qty: 2,
				price: 300.0,
			},
		],
		discountPct: 200,
		status: 'draft',
		createdAt: '2026-01-25T12:27:00',
		updatedAt: '2026-01-25T12:27:00',
	},
	{
		id: '2',
		client: 'Nome do cliente',
		title: 'Título do serviço 2',
		items: [
			{
				id: '1',
				title: 'Serviço 1',
				description: 'Descrição do item 1',
				qty: 2,
				price: 300.0,
			},
		],
		discountPct: 200,
		status: 'draft',
		createdAt: '2026-01-25T12:27:00',
		updatedAt: '2026-01-25T12:27:00',
	},
]

async function saveQuotesToStorage(quotes: Quote[]) {
	try {
		const serialized = JSON.stringify(quotes)
		await AsyncStorage.setItem(ASYNC_STORAGE_KEY, serialized)
	} catch (error) {
		console.error('Error saving quotes to storage:', error)
	}
}

async function getQuotesFromStorage(): Promise<Quote[]> {
	try {
		const serialized = await AsyncStorage.getItem(ASYNC_STORAGE_KEY)
		if (serialized) return JSON.parse(serialized) as Quote[]
	} catch (error) {
		console.error('Error retrieving quotes from storage:', error)
	}
	return DEFAULT_QUOTES
}

async function clearQuotesFromStorage() {
	try {
		await AsyncStorage.removeItem(ASYNC_STORAGE_KEY)
	} catch (error) {
		console.error('Error clearing quotes from storage:', error)
	}
}

async function addQuote(quote: Quote) {
	const quotes = await getQuotesFromStorage()
	const next = [...quotes, quote]
	await saveQuotesToStorage(next)
	return next
}

async function updateQuote(updated: Quote) {
	const quotes = await getQuotesFromStorage()
	const next = quotes.map((q) => (q.id === updated.id ? updated : q))
	await saveQuotesToStorage(next)
	return next
}

async function getQuoteById(id: string) {
	const quotes = await getQuotesFromStorage()
	return quotes.find((q) => q.id === id)
}

export const quotesService = {
	DEFAULT_QUOTES,
	getQuotesFromStorage,
	saveQuotesToStorage,
	clearQuotesFromStorage,
	addQuote,
	updateQuote,
	getQuoteById,
}
