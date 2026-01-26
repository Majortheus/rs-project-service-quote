import { styled } from 'nativewind'
import { View } from 'react-native'
import Tag from '@/assets/icons/mage-icons/svgs/tag.svg'

const StyledTagMageIcon = styled(Tag)

export const TagMageIcon = (props: React.ComponentProps<typeof StyledTagMageIcon>) => {
	return (
		<View {...props}>
			<StyledTagMageIcon {...props} />
		</View>
	)
}
