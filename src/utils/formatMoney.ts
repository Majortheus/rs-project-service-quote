export function formatMoney(amount: number): string {
	return amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })
}
