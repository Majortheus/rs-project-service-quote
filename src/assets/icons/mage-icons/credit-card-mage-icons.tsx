import { styled } from 'nativewind'
import { Platform } from 'react-native'
import CreditCard from '@/assets/icons/mage-icons/svgs/credit-card.svg'

const StyledCreditCardMageIcon = styled(CreditCard)

export const CreditCardMageIcon = (props: React.ComponentProps<typeof StyledCreditCardMageIcon>) => {
	return Platform.OS === 'web' ? <CreditCard {...props} /> : <StyledCreditCardMageIcon {...props} />
}
