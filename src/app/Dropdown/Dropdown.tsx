import React, {
	useCallback,
	useState,
} from 'react';
import cn from 'classnames';

import css from './Dropdown.module.css';
import {useDropdown} from './hooks/useDropdown';

const SHOW_SEARCH_COUNT = 6;

type TElement<T> = React.ReactElement<{
	onClose?: Function;
	options: ReadonlyArray<T>,
}>;

type TOption = {
	value: string | number,
	text: string,
};

interface IProps<T extends TOption> {
	className?: string;
	classNameOverlay?: string;
	placeholder?: string;
	disabled?: boolean;
	onChange: (arg: T) => void;
	options: ReadonlyArray<T>;
	isSearch?: boolean;
	multiple?: boolean;
	header?: TElement<T>;
	footer?: TElement<T>;
	trigger?: TElement<T>;
}

function Dropdown<T extends TOption>({
	className,
	classNameOverlay,
	options,
	placeholder = 'Select',
	disabled,
	trigger,
	header,
	footer,
	isSearch,
}: IProps<T>) {
	const {dropdownRef, isOpen, open, close} = useDropdown();
	const [search, setSearch] = useState('');
	const [searchOptions, setSearchOptions] = useState(options);

	const handleOpen = useCallback(() => {
		if (!disabled) open();
	}, [disabled, open]);

	const handleSearch = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		const searchValue = event.target.value;
		setSearch(searchValue);
		const searchLower = searchValue.trim().toLowerCase();

		setSearchOptions(searchLower
			? options.filter(item => (item.text.toLowerCase()).includes(searchLower))
			: options,
		);
	}, [disabled, options]);

	return (
		<div ref={dropdownRef} className={cn(css.root, className)} onClick={handleOpen}>
			{trigger
				? React.cloneElement(trigger, {onClose: close, options: searchOptions})
				: (
					<div className={css.select}>
						<span className={css.value}>{placeholder}</span>
					</div>
				)
			}
			{isOpen && (
				<div className={cn(css.overlay, classNameOverlay)}>
					{isSearch || options.length > SHOW_SEARCH_COUNT ? (
						<div className={css.search}>
							<input className={css.input} value={search} onChange={handleSearch} />
						</div>
					) : null}
					<div className={css.menu}>
						{header}
						<div className={css.options}>
							<button className={css.option}>Element</button>
						</div>
					</div>
					{footer}
				</div>
			)}
		</div>
	);
}

// open issue https://github.com/DefinitelyTyped/DefinitelyTyped/issues/37087
const typedMemo: <T>(c: T) => T = React.memo;

export default typedMemo(Dropdown);
