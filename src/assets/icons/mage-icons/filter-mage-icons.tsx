import { styled } from 'nativewind'
import { Platform } from 'react-native'
import Filter from '@/assets/icons/mage-icons/svgs/filter.svg'

const StyledFilterMageIcon = styled(Filter)

export const FilterMageIcon = (props: React.ComponentProps<typeof StyledFilterMageIcon>) => {
	return Platform.OS === 'web' ? <Filter {...props} /> : <StyledFilterMageIcon {...props} />
}
