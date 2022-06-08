import { useState, useCallback } from 'react';

export type Data = {
	[x: string]: any;
};
type Callback = (data: Data) => void;

/**
 * useCallbackOnce callback preventing multiple form submission with a timeout.
 * @return
 * status: Boolean - useState to track timeout status
 * @return
 * call: Callback = (data: Data) => void
 */
export default function useCallbackOnce() {
	const [status, statusSet] = useState(false);

	// Prevent mutliple form submission by calling CallOnce timeout function that returns a callback function.
	const CallOnce = (callback: any) => {
		return useCallback((data: Data, callbackFn: Callback, timeout?: number) => {
			if (!status) {
				statusSet(true);
				callback(data, callbackFn, timeout);
			}
		}, []);
	};

	const submitOnce = CallOnce((data: Data, callbackFn: Callback, timeout: number) => {
		callbackFn(data);
		setTimeout(() => {
			statusSet(false);
		}, timeout);
	});

	return {
		status,
		submitOnce,
	};
}
