import { styled } from 'nativewind'
import { View } from 'react-native'
import DirectionUpRight from '@/assets/icons/mage-icons/svgs/direction-up-right.svg'

const StyledDirectionUpRightMageIcon = styled(DirectionUpRight)

export const DirectionUpRightMageIcon = (props: React.ComponentProps<typeof StyledDirectionUpRightMageIcon>) => {
	return (
		<View {...props}>
			<StyledDirectionUpRightMageIcon {...props} />
		</View>
	)
}
