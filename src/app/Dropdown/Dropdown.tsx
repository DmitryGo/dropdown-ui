import React, {
	useCallback,
	useState,
} from 'react';
import cn from 'classnames';

import css from './Dropdown.module.css';
import {useDropdown} from './hooks/useDropdown';

const SHOW_SEARCH_COUNT = 6;

type TElement = React.ReactElement<{
	close?: Function;
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
	header?: TElement;
	bottom?: TElement;
}

function Dropdown<T extends TOption>({
	className,
	classNameOverlay,
	options,
	placeholder = 'Select',
	disabled,
	header,
	bottom,
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
			<div className={css.select}>
				<span className={css.value}>{placeholder}</span>
			</div>
			{isOpen && (
				<div className={cn(css.overlay, classNameOverlay)}>
					{isSearch || options.length > SHOW_SEARCH_COUNT ? (
						<div className={css.search}>
							<input value={search} onChange={handleSearch} />
						</div>
					) : null}
					<div className={css.menu}>
						{header}
						<div className={css.options}>
							<button className={css.option}>Element</button>
						</div>
					</div>
					{bottom}
				</div>
			)}
		</div>
	);
}

// open issue https://github.com/DefinitelyTyped/DefinitelyTyped/issues/37087
const typedMemo: <T>(c: T) => T = React.memo;

export default typedMemo(Dropdown);
