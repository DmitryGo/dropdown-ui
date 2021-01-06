import React, {
	useCallback,
	useEffect,
	useState,
} from 'react';
import cn from 'classnames';
import {Menu} from './components/Menu';

import {useDropdown} from './hooks/useDropdown';
import {
	TOption,
	TValue,
} from './types';

import css from './Dropdown.module.css';

const SHOW_SEARCH_COUNT = 6;

type TElement<T> = React.ReactElement<{
	options?: ReadonlyArray<T>;
	onClose?: Function;
	selectedValue?: ReadonlyArray<string | number>;
}>;


interface IProps<T extends TOption> {
	value: TValue;
	options: ReadonlyArray<T>;
	onChange: (arg: TValue) => void;
	defaultValue?: string | number;
	className?: string;
	classNameOverlay?: string;
	placeholder?: string;
	disabled?: boolean;
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
	onChange,
	multiple,
	value,
	defaultValue,
}: IProps<T>) {
	const {dropdownRef, isOpen, open, close} = useDropdown();
	const [search, setSearch] = useState('');
	const [selectedValue, setSelectedValue] = useState<ReadonlyArray<string | number>>([]);
	const [searchOptions, setSearchOptions] = useState(options);

	useEffect(() => {
		// TODO: FIX ME
		// @ts-ignore
		setSelectedValue(Array.isArray(value) ? value : [value]);
	}, [isOpen, value]);

	useEffect(() => {
		if (multiple && !isOpen) {
			onChange(selectedValue);
		}
	}, [isOpen, multiple, onChange]);

	const handleOpen = useCallback(() => {
		if (!disabled) {
			open();
		}
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

	const handleSelect = useCallback((newValue: string | number) => {
		if (multiple && defaultValue !== newValue) {
			setSelectedValue(prevState => {
				if (defaultValue && prevState.includes(defaultValue)) {
					return [...prevState.filter(cur => cur !== defaultValue), newValue];
				}

				return prevState.includes(newValue)
					? prevState.filter(cur => cur !== newValue)
					: [...prevState, newValue]
			});
			return;
		}

		setSelectedValue([newValue]);
		onChange(Array.isArray(value) ? [newValue] : newValue);
		close();
	}, [onChange, close, multiple]);

	return (
		<div ref={dropdownRef} className={cn(css.root, className)} onClick={handleOpen}>
			{trigger
				? React.cloneElement(trigger, {onClose: close, options: searchOptions})
				: (
					<div className={cn(css.select, disabled && css.disabled)}>
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
						{header ? (
							React.cloneElement(header, {onClose: close, options: searchOptions})
						) : null}
						<Menu
							options={searchOptions}
							onSelect={handleSelect}
							multiple={multiple}
							value={selectedValue}
							defaultValue={defaultValue}
						/>
					</div>
					{footer ? (
						React.cloneElement(footer, {onClose: close, options: searchOptions, selectedValue})
					) : null}
				</div>
			)}
		</div>
	);
}

// open issue https://github.com/DefinitelyTyped/DefinitelyTyped/issues/37087
const typedMemo: <T>(c: T) => T = React.memo;

export default typedMemo(Dropdown);
