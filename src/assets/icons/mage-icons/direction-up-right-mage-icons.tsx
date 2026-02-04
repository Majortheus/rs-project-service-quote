import { styled } from 'nativewind'
import { Platform } from 'react-native'
import DirectionUpRight from '@/assets/icons/mage-icons/svgs/direction-up-right.svg'

const StyledDirectionUpRightMageIcon = styled(DirectionUpRight)

export const DirectionUpRightMageIcon = (props: React.ComponentProps<typeof StyledDirectionUpRightMageIcon>) => {
	return Platform.OS === 'web' ? <DirectionUpRight {...props} /> : <StyledDirectionUpRightMageIcon {...props} />
}
