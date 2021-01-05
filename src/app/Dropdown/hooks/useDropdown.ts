import {
	useState,
	useCallback,
	useRef,
	useEffect,
} from 'react';

export const useDropdown = () => {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	const open = useCallback(() => setIsOpen(true), []);
	const close = useCallback(() => setIsOpen(false), []);

	const handler = useCallback(
		(event: Event) => {
			if (
				dropdownRef.current !== null &&
				dropdownRef.current !== event.target &&
				!dropdownRef.current.contains(event.target as Node)
			)
				close();
		},
		[dropdownRef, close],
	);

	useEffect(() => {
		document.addEventListener('mousedown', handler);
		document.addEventListener('touchstart', handler);

		return () => {
			document.removeEventListener('mousedown', handler);
			document.removeEventListener('touchstart', handler);
		};
	}, [handler]);

	return {dropdownRef, isOpen, open, close};
};
