import { styled } from 'nativewind'
import { View } from 'react-native'
import CreditCard from '@/assets/icons/mage-icons/svgs/credit-card.svg'

const StyledCreditCardMageIcon = styled(CreditCard)

export const CreditCardMageIcon = (props: React.ComponentProps<typeof StyledCreditCardMageIcon>) => {
	return (
		<View {...props}>
			<StyledCreditCardMageIcon {...props} />
		</View>
	)
}
