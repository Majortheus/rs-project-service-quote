import { styled } from 'nativewind'
import { View } from 'react-native'
import NoteWithText from '@/assets/icons/mage-icons/svgs/note-with-text.svg'

const StyledNoteWithTextMageIcon = styled(NoteWithText)

export const NoteWithTextMageIcon = (props: React.ComponentProps<typeof StyledNoteWithTextMageIcon>) => {
	return (
		<View {...props}>
			<StyledNoteWithTextMageIcon {...props} />
		</View>
	)
}
