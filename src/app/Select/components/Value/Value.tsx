import cn from 'classnames';
import React, {
	useCallback,
	useEffect,
	useMemo,
	useRef,
} from 'react';
import {
	TOption,
	TValue,
} from '../../types';

import css from './Value.module.css';

// TODO: Заменить на 10
const MIN_SEARCH_OPTIONS = 2;

interface IProps {
	options: ReadonlyArray<TOption>;
	isOpen: boolean;
	search: string;
	showSearch?: boolean;
	value?: TValue;
	className?: string;
	placeholder?: string;
	disabled?: boolean;
	setSearch: (value: string) => void;
	valueRender?: (arg: TValue, data?: TOption | ReadonlyArray<TOption>) => React.ReactNode;
}

export default React.memo<IProps>(function Option({className, value, search, setSearch, placeholder, disabled, valueRender, options, showSearch, isOpen}) {
	const selectedValue = useMemo(() => options?.find(cur => cur.value === value), [options, value]);
	const inputRef = useRef<HTMLInputElement>(null);
	const handleSearch = useCallback((event: React.SyntheticEvent<HTMLInputElement>) => {
		setSearch(event.currentTarget.value);
	}, [setSearch])

	useEffect(() => {
		if (isOpen && inputRef.current) {
			inputRef.current.focus();
		}
	}, [isOpen]);

	return (
		<div className={cn(css.select, disabled && css.disabled, className)}>
			{!selectedValue && <span className={cn(css.value, css.placeholder)}>{placeholder}</span>}
			{value && valueRender ? valueRender(value, selectedValue) : null}
			{selectedValue && !valueRender ? <span className={cn(css.value)}>{selectedValue.text}</span> : null}
			{showSearch || options.length >= MIN_SEARCH_OPTIONS ? (
				<span className={cn(css.search, isOpen && css.searchActive, !search && css.searchOpacity)}>
					<input
						className={css.input}
						ref={inputRef}
						value={search}
						onChange={handleSearch}
					/>
				</span>
			) : null}
		</div>
	);
});
