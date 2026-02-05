import AsyncStorage from '@react-native-async-storage/async-storage'
import type { FilterFormType } from '@/components/app/home/filter-drawer'
import type { StatusType } from '@/components/status'

const ASYNC_STORAGE_KEY = '@SERVICE-QUOTE:quotes'

export type Quote = {
	id: string
	client: string
	title: string
	items: {
		id: string
		title: string
		description?: string
		qty: number
		price: number
	}[]
	discountPct: number
	status: StatusType
	createdAt: string
	updatedAt: string
}

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
	return []
}

// Apply business rules for filtering/sorting when filters are provided
async function getQuotes(filters?: FilterFormType, search?: string): Promise<Quote[]> {
	const quotes = await getQuotesFromStorage()

	let result = [...quotes]

	// Filter by status (if provided and non-empty)
	if (filters && filters.status && filters.status.length > 0) {
		result = result.filter((q) => filters.status?.includes(q.status))
	}

	// Filter by search (title or client)
	if (search && search.trim().length > 0) {
		const s = search.trim().toLowerCase()
		result = result.filter((q) => q.title.toLowerCase().includes(s) || q.client.toLowerCase().includes(s))
	}

	// Sorting
	const sort = filters?.sort ?? 'recent'

	function totalValue(q: Quote) {
		const subtotal = q.items.reduce((sum, item) => sum + item.price * item.qty, 0)
		const discountAmount = Math.round(((subtotal * q.discountPct) / 100) * 100) / 100
		return Math.round((subtotal - discountAmount) * 100) / 100
	}

	if (sort === 'recent') {
		result.sort((a, b) => Number(new Date(b.createdAt)) - Number(new Date(a.createdAt)))
	} else if (sort === 'oldest') {
		result.sort((a, b) => Number(new Date(a.createdAt)) - Number(new Date(b.createdAt)))
	} else if (sort === 'highest') {
		result.sort((a, b) => totalValue(b) - totalValue(a))
	} else if (sort === 'lowest') {
		result.sort((a, b) => totalValue(a) - totalValue(b))
	}

	return result
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

async function deleteQuoteById(id: string) {
	const quotes = await getQuotesFromStorage()
	const next = quotes.filter((q) => q.id !== id)
	await saveQuotesToStorage(next)
	return next
}

export const quotesService = {
	getQuotesFromStorage,
	getQuotes,
	saveQuotesToStorage,
	clearQuotesFromStorage,
	addQuote,
	updateQuote,
	getQuoteById,
	deleteQuoteById,
}
