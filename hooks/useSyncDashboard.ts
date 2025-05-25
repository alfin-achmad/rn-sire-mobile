import { useEffect, useRef } from 'react';

interface SyncParamsOptions<T> {
	params: T;
	state: T;
	setState: (v: T) => void;
	onParamsChange: () => void;
}

export function useSyncDashboard<T extends Record<string, any>>({
	                                                             params,
	                                                             state,
	                                                             setState,
	                                                             onParamsChange,
                                                             }: SyncParamsOptions<T>) {
	const mounted = useRef(false);

	useEffect(() => {
		for (const key of Object.keys(params) as (keyof T)[]) {
			if (params[key] !== state[key]) {
				setState(params[key]);
			}
		}
		mounted.current = true;
		// we intentionally run this only on mount
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (mounted.current) {
			onParamsChange();
		}
	}, [...Object.values(params), onParamsChange]);
}
