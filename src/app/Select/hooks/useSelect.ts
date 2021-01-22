import {
	useState,
	useCallback,
	useRef,
	useEffect,
} from 'react';

export const useSelect = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [search, setSearch] = useState('');
	const selectRef = useRef<HTMLDivElement>(null);

	const open = useCallback(() => setIsOpen(true), []);
	const close = useCallback(() => {
		setIsOpen(false);
		setSearch('');
	}, []);

	const handler = useCallback(
		(event: Event) => {
			if (
				selectRef.current !== null &&
				selectRef.current !== event.target &&
				!selectRef.current.contains(event.target as Node)
			)
				close();
		},
		[close],
	);

	useEffect(() => {
		document.addEventListener('mousedown', handler);
		document.addEventListener('touchstart', handler);

		return () => {
			document.removeEventListener('mousedown', handler);
			document.removeEventListener('touchstart', handler);
		};
	}, [handler]);

	return {selectRef, isOpen, open, close, search, setSearch};
};
