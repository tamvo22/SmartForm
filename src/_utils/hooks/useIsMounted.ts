import { useCallback, useEffect, useRef } from 'react';
/**
 * Use whenever performing
 * @returns boolean
 */
export default function useIsMounted(): boolean {
	const isMountedRef = useRef(true);

	useEffect(() => {
		isMountedRef.current = true;

		return () => {
			isMountedRef.current = false;
		};
	}, []);

	const isMounted = useCallback(() => {
		return isMountedRef.current;
	}, []);

	return isMounted();
}
