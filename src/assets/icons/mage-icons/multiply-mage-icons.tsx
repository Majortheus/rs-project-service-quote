import { styled } from 'nativewind'
import { View } from 'react-native'
import Multiply from '@/assets/icons/mage-icons/svgs/multiply.svg'

const StyledMultiplyMageIcon = styled(Multiply)

export const MultiplyMageIcon = (props: React.ComponentProps<typeof StyledMultiplyMageIcon>) => {
	return (
		<View {...props}>
			<StyledMultiplyMageIcon {...props} />
		</View>
	)
}
