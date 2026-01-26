import { styled } from 'nativewind'
import { View } from 'react-native'
import Trash from '@/assets/icons/mage-icons/svgs/trash.svg'

const StyledTrashMageIcon = styled(Trash)

export const TrashMageIcon = (props: React.ComponentProps<typeof StyledTrashMageIcon>) => {
	return (
		<View {...props}>
			<StyledTrashMageIcon {...props} />
		</View>
	)
}
