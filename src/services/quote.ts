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
	saveQuotesToStorage,
	clearQuotesFromStorage,
	addQuote,
	updateQuote,
	getQuoteById,
	deleteQuoteById,
}
