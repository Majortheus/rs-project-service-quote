import { styled } from 'nativewind'
import { View } from 'react-native'
import Copy from '@/assets/icons/mage-icons/svgs/copy.svg'

const StyledCopyMageIcon = styled(Copy)

export const CopyMageIcon = (props: React.ComponentProps<typeof StyledCopyMageIcon>) => {
	return (
		<View {...props}>
			<StyledCopyMageIcon {...props} />
		</View>
	)
}
