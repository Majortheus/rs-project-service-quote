import { styled } from 'nativewind'
import { View } from 'react-native'
import ChevronRight from '@/assets/icons/mage-icons/svgs/chevron-right.svg'

const StyledChevronRightMageIcon = styled(ChevronRight)

export const ChevronRightMageIcon = (props: React.ComponentProps<typeof StyledChevronRightMageIcon>) => {
	return (
		<View {...props}>
			<StyledChevronRightMageIcon {...props} />
		</View>
	)
}
