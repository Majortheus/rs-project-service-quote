import { styled } from 'nativewind'
import { Platform } from 'react-native'
import Minus from '@/assets/icons/mage-icons/svgs/minus.svg'

const StyledMinusMageIcon = styled(Minus)

export const MinusMageIcon = (props: React.ComponentProps<typeof StyledMinusMageIcon>) => {
	return Platform.OS === 'web' ? <Minus {...props} /> : <StyledMinusMageIcon {...props} />
}
