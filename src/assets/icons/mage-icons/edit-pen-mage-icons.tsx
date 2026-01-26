import { styled } from 'nativewind'
import { View } from 'react-native'
import EditPen from '@/assets/icons/mage-icons/svgs/edit-pen.svg'

const StyledEditPenMageIcon = styled(EditPen)

export const EditPenMageIcon = (props: React.ComponentProps<typeof StyledEditPenMageIcon>) => {
	return (
		<View {...props}>
			<StyledEditPenMageIcon {...props} />
		</View>
	)
}
