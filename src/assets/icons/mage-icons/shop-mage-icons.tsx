import { styled } from 'nativewind'
import { Platform } from 'react-native'
import Shop from '@/assets/icons/mage-icons/svgs/shop.svg'

const StyledShopMageIcon = styled(Shop)

export const ShopMageIcon = (props: React.ComponentProps<typeof StyledShopMageIcon>) => {
	return Platform.OS === 'web' ? <Shop {...props} /> : <StyledShopMageIcon {...props} />
}
