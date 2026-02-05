import { toast } from '@backpackapp-io/react-native-toast'
import { clsx } from 'clsx'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { FlatList, Share, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { twMerge } from 'tailwind-merge'
import { CopyMageIcon } from '@/assets/icons/mage-icons/copy-mage-icons'
import { CreditCardMageIcon } from '@/assets/icons/mage-icons/credit-card-mage-icons'
import { DirectionUpRightMageIcon } from '@/assets/icons/mage-icons/direction-up-right-mage-icons'
import { EditPenMageIcon } from '@/assets/icons/mage-icons/edit-pen-mage-icons'
import { NoteWithTextMageIcon } from '@/assets/icons/mage-icons/note-with-text-mage-icons'
import { ShopMageIcon } from '@/assets/icons/mage-icons/shop-mage-icons'
import { TrashMageIcon } from '@/assets/icons/mage-icons/trash-mage-icons'
import { Button } from '@/components/button'
import { FormGroup } from '@/components/form/form-group'
import { KeyboardScroll } from '@/components/keyboard-aware-scroll'
import { BackButton } from '@/components/page/back-button'
import { Page } from '@/components/page/page'
import { Status } from '@/components/status'
import { Typography } from '@/components/typography'
import { useMutateQuotes } from '@/services/queries/quotes-query'
import type { Quote } from '@/services/quote'
import { formatDate } from '@/utils/formatDate'
import { formatMoney } from '@/utils/formatMoney'
import { ConfirmDeleteModal } from './confirm-delete-modal'

type Props = {
	quote: Quote
}

export function QuoteDetailsView({ quote }: Props) {
	const { addQuote, deleteQuote } = useMutateQuotes()
	const router = useRouter()
	const [confirmVisible, setConfirmVisible] = useState(false)

	const subtotal = quote.items.reduce((sum, it) => sum + it.price * it.qty, 0)
	const discountAmount = Math.round(((subtotal * quote.discountPct) / 100) * 100) / 100
	const total = Math.max(0, Math.round((subtotal - discountAmount) * 100) / 100)

	return (
		<Page>
			<View className="w-full flex-row items-center justify-start gap-5 border-gray-200 border-b p-5">
				<BackButton />
				<Typography variant="title-sm" className="flex-1">
					Orçamento #{quote.id}
				</Typography>
				<Status status={quote.status} />
			</View>

			<KeyboardScroll contentContainerStyle={{ flex: 1 }}>
				<View className="gap-5 p-5 pb-28">
					<View className="rounded-[10px] border border-gray-200 bg-gray-100">
						<View className="p-4">
							<View className="flex-row items-start gap-3">
								<View className="h-9 w-9 items-center justify-center rounded-lg bg-purple-light">
									<ShopMageIcon className="max-h-[20px] max-w-5 text-purple-base" />
								</View>
								<View className="flex-1">
									<Typography variant="title-lg">{quote.title}</Typography>
								</View>
							</View>
						</View>

						<View className="gap-3 border-gray-200 border-t px-5 py-4">
							<View className="gap-1">
								<Typography variant="text-xs" className="text-gray-600">
									Cliente
								</Typography>
								<Typography variant="text-sm">{quote.client}</Typography>
							</View>

							<View className="flex-row justify-between">
								<View className="flex-1 gap-1">
									<Typography variant="text-xs" className="text-gray-600">
										Criado em
									</Typography>
									<Typography variant="text-sm">{formatDate(quote.createdAt)}</Typography>
								</View>

								<View className="flex-1 gap-1">
									<Typography variant="text-xs" className="text-gray-600">
										Atualizado em
									</Typography>
									<Typography variant="text-sm">{formatDate(quote.updatedAt)}</Typography>
								</View>
							</View>
						</View>
					</View>

					<FormGroup title="Serviços inclusos" icon={NoteWithTextMageIcon}>
						<View className="p-5 pt-4">
							<FlatList
								data={quote.items}
								keyExtractor={(item) => item.id}
								renderItem={({ item }) => (
									<View className="flex-row items-start justify-between gap-4">
										<View className="flex-1">
											<View className="gap-0.5">
												<Typography variant="title-sm" truncate>
													{item.title}
												</Typography>
												{item.description ? (
													<Typography variant="text-xs" className="text-gray-500">
														{item.description}
													</Typography>
												) : null}
											</View>
										</View>

										<View className="items-end gap-0.5">
											<View className="flex-row items-baseline gap-1">
												<Typography variant="text-xs">R$</Typography>
												<Typography variant="title-md">{formatMoney(item.price)}</Typography>
											</View>
											<Typography variant="text-xs" className="text-gray-600">
												Qt: {item.qty}
											</Typography>
										</View>
									</View>
								)}
								scrollEnabled={false}
								contentContainerClassName="gap-5"
							/>
						</View>
					</FormGroup>

					<View className="rounded-lg border border-gray-200 bg-gray-100 p-4">
						<View className="flex-row items-start gap-4">
							<View className="h-9 w-9 items-center justify-center rounded-lg bg-purple-light">
								<CreditCardMageIcon className="max-h-[20px] max-w-5 text-purple-base" />
							</View>
							<View className="flex-1 gap-2">
								<View className="flex-row items-center justify-between">
									<Typography variant="text-sm" className="text-gray-600">
										Subtotal
									</Typography>
									<Typography variant="title-sm" className={twMerge('text-gray-600', clsx({ 'line-through': quote.discountPct > 0 }))}>
										R$ {formatMoney(subtotal)}
									</Typography>
								</View>

								{quote.discountPct > 0 && (
									<View className="flex-row items-center justify-between">
										<View className="flex-row items-center gap-3">
											<Typography variant="text-sm" className="text-gray-600">
												Desconto
											</Typography>
											<Typography variant="title-xs" className="rounded bg-success-light px-1.5 py-0.5 text-success-dark">
												{quote.discountPct}% off
											</Typography>
										</View>
										<Typography variant="title-sm" className={'text-success-dark'}>
											- R$ {formatMoney(discountAmount)}
										</Typography>
									</View>
								)}

								<View className="flex-row items-center justify-between border-gray-200 border-t pt-2">
									<Typography variant="title-sm">Investimento total</Typography>
									<View className="flex-row items-baseline gap-1">
										<Typography variant="text-xs">R$</Typography>
										<Typography variant="title-lg">{formatMoney(total)}</Typography>
									</View>
								</View>
							</View>
						</View>
					</View>
				</View>
			</KeyboardScroll>

			<SafeAreaView edges={['bottom']} className="w-full">
				<View className="w-full flex-row items-center justify-between border-gray-200 border-t bg-white p-5 pb-10">
					<View className="flex-row items-center gap-2">
						<Button variant="outlined" color="danger" startIcon={TrashMageIcon} onPress={() => setConfirmVisible(true)} />
						<Button
							variant="outlined"
							startIcon={CopyMageIcon}
							onPress={async () => {
								try {
									const now = new Date().toISOString()
									const newId = String(Date.now())
									const duplicated: Quote = {
										...quote,
										id: newId,
										title: `${quote.title} (Cópia)`,
										createdAt: now,
										updatedAt: now,
										items: quote.items.map((it) => ({ ...it })),
									}
									await addQuote.mutateAsync(duplicated)
									router.replace({ pathname: '/quote-details', params: { id: duplicated.id } })
								} catch (error) {
									console.error('Error duplicating quote:', error)
								}
							}}
						/>
						<Button variant="outlined" startIcon={EditPenMageIcon} onPress={() => router.push({ pathname: '/create-quote', params: { id: quote.id } })} />
					</View>

					<Button
						startIcon={DirectionUpRightMageIcon}
						className="w-[146px]"
						onPress={async () => {
							try {
								const itemsText = quote.items.map((it) => `${it.qty}x ${it.title} - R$ ${formatMoney(it.price)}`).join('\n')

								const discountText = quote.discountPct > 0 ? `Desconto: ${quote.discountPct}% (- R$ ${formatMoney(discountAmount)})\n\n` : ''

								const message = `Orçamento #${quote.id}\n${quote.title}\nCliente: ${quote.client}\n\nItens:\n${itemsText}\n\n${discountText}Total: R$ ${formatMoney(total)}`

								await Share.share({ message })
							} catch (error) {
								toast.error('Erro ao compartilhar orçamento')
								console.error('Error sharing quote:', error)
							}
						}}
					>
						Compartilhar
					</Button>
				</View>
			</SafeAreaView>

			<ConfirmDeleteModal
				visible={confirmVisible}
				onCancel={() => setConfirmVisible(false)}
				onConfirm={async () => {
					try {
						await deleteQuote.mutateAsync(quote.id)
						setConfirmVisible(false)
						router.push('/')
					} catch (error) {
						console.error('Error deleting quote:', error)
					}
				}}
			/>
		</Page>
	)
}
