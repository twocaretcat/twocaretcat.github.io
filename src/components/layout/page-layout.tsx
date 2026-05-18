/*
	A layout component for pages that applies basic styles and adds headers and footers
	-----------------------------------------------------------------------------------
*/

import type { PropsWithChildren } from 'react';
import type {
	PageSection,
	PropsWithClassName,
} from '../../types/components.ts';
import { getClassNameProps } from '../../utils/other.ts';
import { BaseLayout } from './base-layout.tsx';
import { Footer } from './footer.tsx';
import { Header } from './header.tsx';

// Types

interface Props extends PropsWithClassName, PropsWithChildren {
	expandTitle?: boolean;
	sections?: readonly PageSection[];
}

export function PageLayout({
	className,
	expandTitle,
	sections = [],
	children,
}: Props) {
	const classNameProps = getClassNameProps(className);

	// Code ported from Mergist
	// const lsKeyForTheme = 'is-dark-theme';
	// const lsKeyForMotion = 'is-motion-allowed';
	// Whether the component is currently being mounted or not
	// We can use this to ignore initial state changes of the component
	// const isMount = useIsMount();
	// const [isDarkTheme, setIsDarkTheme] = useState<boolean>(getIsDarkMode());
	// const [isMotionAllowed, setIsMotionAllowed] = useState<boolean>(getIsMotionAllowed());

	// Save the user's preferences to local storage or cookies when its state changes
	// useEffect(() => {
	// 	StorageManager.setIf(!isMount, lsKeyForTheme, isDarkTheme);
	// }, [isDarkTheme]);

	// useEffect(() => {
	// 	StorageManager.setIf(!isMount, lsKeyForMotion, isMotionAllowed);
	// }, [isMotionAllowed]);

	// Get the user's preference from storage if it exists
	// Otherwise, use the system preference if it is set or fall back to the default value
	// function getIsDarkMode(): boolean {
	// 	return StorageManager.get(lsKeyForTheme, mediaFeatureMatches('prefers-color-scheme', 'dark', true));
	// }

	// function getIsMotionAllowed(): boolean {
	// 	return StorageManager.get(lsKeyForMotion, !mediaFeatureMatches('prefers-reduced-motion', 'reduce', false));
	// }

	// Define toggle functions and memoize before passing to the relevant context provider
	// const providerValuesForTheme = useMemo(() => ({
	// 	isEnabled: isDarkTheme,
	// 	toggle: () => {
	// 		setIsDarkTheme(!isDarkTheme);
	// 	}
	// }), [isDarkTheme]);

	// const providerValuesForMotion = useMemo(() => ({
	// 	isEnabled: isMotionAllowed,
	// 	toggle: () => {
	// 		setIsMotionAllowed(!isMotionAllowed);
	// 	}
	// }), [isMotionAllowed]);

	// <DarkThemeContext.Provider value={providerValuesForTheme}>
	// <AllowMotionContext.Provider value={providerValuesForMotion}>
	// 	</AllowMotionContext.Provider>
	// </DarkThemeContext.Provider>

	return (
		<BaseLayout {...{ classNameProps }}>
			<Header {...{ expandTitle, sections }} />
			{children}
			<Footer />
		</BaseLayout>
	);
}
