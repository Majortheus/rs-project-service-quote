import { styled } from 'nativewind'
import { View } from 'react-native'
import Search from '@/assets/icons/mage-icons/svgs/search.svg'

const StyledSearchMageIcon = styled(Search)

export const SearchMageIcon = (props: React.ComponentProps<typeof StyledSearchMageIcon>) => {
	return (
		<View {...props}>
			<StyledSearchMageIcon {...props} />
		</View>
	)
}
