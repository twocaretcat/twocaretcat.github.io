import { useEffect, useState, type RefObject } from 'react';

/**
 * Configuration for {@link useElementInView}.
 */
interface Options {
	/**
	 * The amount of the element that must be visible before it is considered in view.
	 */
	threshold?: IntersectionObserverInit['threshold'];
	/**
	 * The value returned before the observer has reported the element's measured intersection state.
	 *
	 * A function can be used when the initial value depends on browser state at mount time, such as
	 * `window.location.hash` or `window.scrollY`.
	 */
	initial?: boolean | (() => boolean);
	/**
	 * Margin applied to the viewport bounds before checking whether the element intersects.
	 */
	rootMargin?: IntersectionObserverInit['rootMargin'];
}

/**
 * Tracks whether an element intersects the viewport and reconciles state from every observer entry.
 *
 * @remarks
 * This intentionally uses the native {@link IntersectionObserver} instead of Motion's `useInView`.
 * Motion's hook is built around enter and leave callbacks. If its `initial` value is `true` and the
 * first measured observer state is already outside the viewport, there may be no prior enter callback
 * to register the leave handler that would reset state to `false`. This hook sets state directly from
 * each observer entry, so the first measurement can always correct the initial value.
 *
 * @param ref - Ref for the element to observe.
 * @param options - Observer and initial-state options.
 * @returns Whether the element currently intersects the viewport.
 */
export function useElementInView(
	ref: RefObject<Element>,
	{ initial = false, rootMargin, threshold = 0 }: Options = {},
) {
	const [isInView, setIsInView] = useState(initial);

	useEffect(() => {
		const element = ref.current;

		if (!element || typeof IntersectionObserver === 'undefined') {
			return undefined;
		}

		const observer = new IntersectionObserver(
			([entry]) => setIsInView(entry.isIntersecting),
			{
				...(rootMargin ? { rootMargin } : {}),
				threshold,
			},
		);

		observer.observe(element);

		return () => observer.disconnect();
	}, [ref, rootMargin, threshold]);

	return isInView;
}
