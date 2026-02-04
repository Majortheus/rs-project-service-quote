import { styled } from 'nativewind'
import { Platform } from 'react-native'
import Search from '@/assets/icons/mage-icons/svgs/search.svg'

const StyledSearchMageIcon = styled(Search)

export const SearchMageIcon = (props: React.ComponentProps<typeof StyledSearchMageIcon>) => {
	return Platform.OS === 'web' ? <Search {...props} /> : <StyledSearchMageIcon {...props} />
}
