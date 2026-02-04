import { styled } from 'nativewind'
import { Platform } from 'react-native'
import Trash from '@/assets/icons/mage-icons/svgs/trash-2.svg'

const StyledTrashMageIcon = styled(Trash)

export const TrashMageIcon = (props: React.ComponentProps<typeof StyledTrashMageIcon>) => {
	return Platform.OS === 'web' ? <Trash {...props} /> : <StyledTrashMageIcon {...props} />
}
