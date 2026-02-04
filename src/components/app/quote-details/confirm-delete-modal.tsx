import { View } from 'react-native'
import Modal from 'react-native-modal'
import { TrashMageIcon } from '@/assets/icons/mage-icons/trash-mage-icons'
import { Button } from '@/components/button'
import { Typography } from '@/components/typography'

type Props = {
	visible: boolean
	onConfirm: () => void
	onCancel: () => void
}

export function ConfirmDeleteModal({ visible, onConfirm, onCancel }: Props) {
	return (
		<Modal isVisible={visible} backdropOpacity={0.7} onBackdropPress={onCancel}>
			<View className="rounded-lg bg-white p-5">
				<Typography variant="title-md">Confirmar exclusão</Typography>
				<Typography variant="text-sm" className="mt-2 text-gray-600">
					Tem certeza que deseja excluir este orçamento? Esta ação não pode ser desfeita.
				</Typography>

				<View className="mt-4 flex-row justify-end gap-3">
					<Button className="w-[90px]" variant="outlined" color="danger" onPress={onCancel}>
						Cancelar
					</Button>
					<Button className="w-[120px]" startIcon={TrashMageIcon} onPress={onConfirm}>
						Excluir
					</Button>
				</View>
			</View>
		</Modal>
	)
}
