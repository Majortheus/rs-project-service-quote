import BottomSheet, { BottomSheetBackdrop, BottomSheetModalProvider, BottomSheetScrollView } from '@gorhom/bottom-sheet'
import { createContext, useCallback, useContext, useRef, useState } from 'react'
import { KeyboardScroll } from '@/components/keyboard-aware-scroll'

type BottomSheetContextValue = {
	openBottomSheet: (content: React.ReactNode, config?: BottomSheetConfig) => void
	closeBottomSheet: () => void
}

type BottomSheetConfig = {
	snapPoints?: (string | number)[]
	enablePanDownToClose?: boolean
}

const BottomSheetContext = createContext<BottomSheetContextValue | null>(null)

const defaultConfig: BottomSheetConfig = {
	snapPoints: ['75%', '90%'],
	enablePanDownToClose: true,
}

export function BottomSheetProvider({ children }: { children: React.ReactNode }) {
	const bottomSheetRef = useRef<BottomSheet>(null)

	const [content, setContent] = useState<React.ReactNode>(null)
	const [config, setConfig] = useState<BottomSheetConfig>(defaultConfig)

	const openBottomSheet = useCallback((content: React.ReactNode, config?: BottomSheetConfig) => {
		setConfig({ ...defaultConfig, ...config })
		setContent(content)

		bottomSheetRef.current?.snapToIndex(0)
	}, [])

	const closeBottomSheet = useCallback(() => {
		bottomSheetRef.current?.close()
		setContent(null)
	}, [])

	const handleSheetChanges = useCallback(
		(index: number) => {
			if (index === -1) {
				closeBottomSheet()
			}
		},
		[closeBottomSheet],
	)

	return (
		<BottomSheetModalProvider>
			<BottomSheetContext.Provider value={{ openBottomSheet, closeBottomSheet }}>
				{children}
				<BottomSheet
					ref={bottomSheetRef}
					backgroundStyle={{
						borderTopLeftRadius: 32,
						borderTopRightRadius: 32,
					}}
					backdropComponent={(props) => <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} opacity={0.7} pressBehavior="close" />}
					enablePanDownToClose={config.enablePanDownToClose ?? true}
					index={-1}
					animateOnMount
					snapPoints={config.snapPoints}
					onChange={handleSheetChanges}
				>
					<BottomSheetScrollView>
						<KeyboardScroll className="flex-1 bg-white">{content}</KeyboardScroll>
					</BottomSheetScrollView>
				</BottomSheet>
			</BottomSheetContext.Provider>
		</BottomSheetModalProvider>
	)
}

export const useBottomSheet = (): BottomSheetContextValue => {
	const ctx = useContext(BottomSheetContext)
	if (!ctx) throw new Error('useBottomSheet must be used within BottomSheetProvider')
	return ctx
}
