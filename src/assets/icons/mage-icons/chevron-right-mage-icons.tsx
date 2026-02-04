import { styled } from 'nativewind'
import { Platform } from 'react-native'
import ChevronRight from '@/assets/icons/mage-icons/svgs/chevron-right.svg'

const StyledChevronRightMageIcon = styled(ChevronRight)

export const ChevronRightMageIcon = (props: React.ComponentProps<typeof StyledChevronRightMageIcon>) => {
	return Platform.OS === 'web' ? <ChevronRight {...props} /> : <StyledChevronRightMageIcon {...props} />
}
