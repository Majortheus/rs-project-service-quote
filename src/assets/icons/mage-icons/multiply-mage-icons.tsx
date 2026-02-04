import { styled } from 'nativewind'
import { Platform } from 'react-native'
import Multiply from '@/assets/icons/mage-icons/svgs/multiply.svg'

const StyledMultiplyMageIcon = styled(Multiply)

export const MultiplyMageIcon = (props: React.ComponentProps<typeof StyledMultiplyMageIcon>) => {
	return Platform.OS === 'web' ? <Multiply {...props} /> : <StyledMultiplyMageIcon {...props} />
}
