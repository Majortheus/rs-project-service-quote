import { styled } from 'nativewind'
import { View } from 'react-native'
import Calendar from '@/assets/icons/mage-icons/svgs/calendar.svg'

const StyledCalendarMageIcon = styled(Calendar)

export const CalendarMageIcon = (props: React.ComponentProps<typeof StyledCalendarMageIcon>) => {
	return (
		<View {...props}>
			<StyledCalendarMageIcon {...props} />
		</View>
	)
}
