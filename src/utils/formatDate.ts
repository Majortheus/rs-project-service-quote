import dayjs from 'dayjs'

export function formatDate(value?: string | Date | number) {
	const d = dayjs(value)
	if (!d.isValid()) return ''
	return d.format('DD/MM/YYYY')
}
