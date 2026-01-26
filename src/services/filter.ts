import AsyncStorage from '@react-native-async-storage/async-storage'
import type { FilterFormType } from '@/components/app/home/filter-drawer'

const ASYNC_STORAGE_KEY = '@SERVICE-QUOTE:filters'

const DEFAULT_FILTER_VALUES = {
	status: [],
	sort: 'recent' as const,
}

async function saveFiltersToStorage(filters: FilterFormType) {
	try {
		const serializedFilters = JSON.stringify(filters)
		await AsyncStorage.setItem(ASYNC_STORAGE_KEY, serializedFilters)
	} catch (error) {
		console.error('Error saving filters to storage:', error)
	}
}

async function getFiltersFromStorage(): Promise<FilterFormType> {
	try {
		const serializedFilters = await AsyncStorage.getItem(ASYNC_STORAGE_KEY)
		console.log({ serializedFilters })
		if (serializedFilters) {
			return JSON.parse(serializedFilters)
		}
	} catch (error) {
		console.error('Error retrieving filters from storage:', error)
	}
	return DEFAULT_FILTER_VALUES
}

async function clearFiltersFromStorage() {
	try {
		await AsyncStorage.removeItem(ASYNC_STORAGE_KEY)
	} catch (error) {
		console.error('Error clearing filters from storage:', error)
	}
}

export const filtersService = {
	DEFAULT_FILTER_VALUES,
	getFiltersFromStorage,
	saveFiltersToStorage,
	clearFiltersFromStorage,
}
