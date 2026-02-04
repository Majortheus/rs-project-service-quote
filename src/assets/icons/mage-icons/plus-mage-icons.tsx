import { styled } from 'nativewind'
import { Platform } from 'react-native'
import Plus from '@/assets/icons/mage-icons/svgs/plus.svg'

const StyledPlusMageIcon = styled(Plus)

export const PlusMageIcon = (props: React.ComponentProps<typeof StyledPlusMageIcon>) => {
	return Platform.OS === 'web' ? <Plus {...props} /> : <StyledPlusMageIcon {...props} />
}
