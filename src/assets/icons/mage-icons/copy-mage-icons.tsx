import { styled } from 'nativewind'
import { Platform } from 'react-native'
import Copy from '@/assets/icons/mage-icons/svgs/copy.svg'

const StyledCopyMageIcon = styled(Copy)

export const CopyMageIcon = (props: React.ComponentProps<typeof StyledCopyMageIcon>) => {
	return Platform.OS === 'web' ? <Copy {...props} /> : <StyledCopyMageIcon {...props} />
}
