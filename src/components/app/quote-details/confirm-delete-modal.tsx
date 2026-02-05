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
			<View className="gap-1 rounded-lg bg-white p-5">
				<Typography variant="title-lg">Confirmar exclusão</Typography>
				<Typography variant="text-md" className="mt-2 text-gray-600">
					Tem certeza que deseja excluir este orçamento?
				</Typography>
				<Typography variant="text-sm" className="text-gray-600">
					Esta ação não pode ser desfeita.
				</Typography>

				<View className="mt-5 flex-row justify-end gap-3">
					<Button className="w-[86px]" variant="outlined" color="danger" onPress={onCancel}>
						Cancelar
					</Button>
					<Button className="w-[116px]" startIcon={TrashMageIcon} onPress={onConfirm}>
						Excluir
					</Button>
				</View>
			</View>
		</Modal>
	)
}
