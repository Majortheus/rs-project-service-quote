import { styled } from 'nativewind'
import { View } from 'react-native'
import Shop from '@/assets/icons/mage-icons/svgs/shop.svg'

const StyledShopMageIcon = styled(Shop)

export const ShopMageIcon = (props: React.ComponentProps<typeof StyledShopMageIcon>) => {
	return (
		<View {...props}>
			<StyledShopMageIcon {...props} />
		</View>
	)
}
