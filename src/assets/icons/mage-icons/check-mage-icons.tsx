import { styled } from 'nativewind'
import { Platform } from 'react-native'
import Check from '@/assets/icons/mage-icons/svgs/check.svg'

const StyledCheckMageIcon = styled(Check)

export const CheckMageIcon = (props: React.ComponentProps<typeof StyledCheckMageIcon>) => {
	return Platform.OS === 'web' ? <Check {...props} /> : <StyledCheckMageIcon {...props} />
}
