import { styled } from 'nativewind'
import { View } from 'react-native'
import ChevronLeft from '@/assets/icons/mage-icons/svgs/chevron-left.svg'

const StyledChevronLeftMageIcon = styled(ChevronLeft)

export const ChevronLeftMageIcon = (props: React.ComponentProps<typeof StyledChevronLeftMageIcon>) => {
	return (
		<View {...props}>
			<StyledChevronLeftMageIcon {...props} />
		</View>
	)
}
