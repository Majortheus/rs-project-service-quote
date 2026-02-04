import { clsx } from 'clsx'
import { FlatList, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { twMerge } from 'tailwind-merge'
import { CheckMageIcon } from '@/assets/icons/mage-icons/check-mage-icons'
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
import { formatMoney } from '@/utils/formatMoney'
import type { QuoteFormType } from '../create-quote'

const MOCK_QUOTE: QuoteFormType = {
	id: '1',
	client: 'Cliente Exemplo',
	title: 'Instalação elétrica - residência',
	services: [
		{ id: '1', title: 'Pontos de luz', description: 'Instalação de pontos de luz', quantity: 2, price: 250 },
		{ id: '2', title: 'Quadro de disjuntores', description: 'Troca do quadro de disjuntores', quantity: 1, price: 500 },
	],
	discount: 10,
	status: 'sent',
}

export default function QuoteDetailsScreen() {
	const quote = MOCK_QUOTE

	const subtotal = quote.services.reduce((sum, it) => sum + it.price * it.quantity, 0)
	const discountAmount = Math.round(((subtotal * quote.discount) / 100) * 100) / 100
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
									<Typography variant="text-sm">22/08/2024</Typography>
								</View>

								<View className="flex-1 gap-1">
									<Typography variant="text-xs" className="text-gray-600">
										Atualizado em
									</Typography>
									<Typography variant="text-sm">25/08/2024</Typography>
								</View>
							</View>
						</View>
					</View>

					<FormGroup title="Serviços inclusos" icon={NoteWithTextMageIcon}>
						<View className="p-5 pt-4">
							<FlatList
								data={quote.services}
								keyExtractor={(_, i) => i.toString()}
								renderItem={({ item }) => (
									<View className="flex-row items-start justify-between gap-4">
										<View className="flex-1">
											<View className="gap-0.5">
												<Typography variant="title-sm" truncate>
													{item.title}
												</Typography>
												<Typography variant="text-xs" className="text-gray-500">
													{item.description}
												</Typography>
											</View>
										</View>

										<View className="items-end gap-0.5">
											<View className="flex-row items-baseline gap-1">
												<Typography variant="text-xs">R$</Typography>
												<Typography variant="title-md">{formatMoney(item.price)}</Typography>
											</View>
											<Typography variant="text-xs" className="text-gray-600">
												Qt: {item.quantity}
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
									<Typography variant="title-sm" className={twMerge('text-gray-600', clsx({ 'line-through': quote.discount > 0 }))}>
										R$ {formatMoney(subtotal)}
									</Typography>
								</View>

								{quote.discount > 0 && (
									<View className="flex-row items-center justify-between">
										<View className="flex-row items-center gap-3">
											<Typography variant="text-sm" className="text-gray-600">
												Desconto
											</Typography>
											<Typography variant="title-xs" className="rounded bg-success-light px-1.5 py-0.5 text-success-dark">
												{quote.discount}% off
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
						<Button variant="outlined" color="danger" startIcon={TrashMageIcon} />
						<Button variant="outlined" startIcon={CopyMageIcon} />
						<Button variant="outlined" startIcon={EditPenMageIcon} />
					</View>

					<Button startIcon={DirectionUpRightMageIcon} className="w-[146px]">
						Compartilhar
					</Button>
				</View>
			</SafeAreaView>
		</Page>
	)
}
