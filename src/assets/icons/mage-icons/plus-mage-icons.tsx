import { styled } from 'nativewind'
import { View } from 'react-native'
import Plus from '@/assets/icons/mage-icons/svgs/plus.svg'

const StyledPlusMageIcon = styled(Plus)

export const PlusMageIcon = (props: React.ComponentProps<typeof StyledPlusMageIcon>) => {
	return (
		<View {...props}>
			<StyledPlusMageIcon {...props} />
		</View>
	)
}
