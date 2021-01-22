import React, {
	useCallback,
	useMemo,
	useState,
} from 'react';
import cn from 'classnames';
import {TOption} from '../SelectOld';
import {Value} from './components/Value';

import {useSelect} from './hooks/useSelect';
import {
	TValue,
} from './types';

import css from './Select.module.css';

interface IProps {
	children: React.ReactNode;
	value?: TValue;
	options: ReadonlyArray<TOption>;
	className?: string;
	placeholder?: string;
	disabled?: boolean;
	showSearch?: boolean;
	onChange: (arg: TValue) => void;
	valueRender?: (arg: TValue, data?: TOption | ReadonlyArray<TOption>) => React.ReactNode;
}

function Select({
	value,
	options,
	className,
	placeholder = 'Select',
	children,
	disabled,
	showSearch,
	onChange,
	valueRender,
}: IProps) {
	const {selectRef, isOpen, open, close, search, setSearch} = useSelect();

	const handleOpen = useCallback(() => {
		if (!disabled) {
			open();
		}
	}, [disabled, open]);

	const handleClickOption = useCallback((arg: TValue) => {
		onChange(arg);
		close();
	}, [onChange, close]);

	const menu = useMemo(() => {
		const filterChildren = React.Children.toArray(children).filter(child => {
			return React.isValidElement(child)
				&& (!search || child.props.data.text.toLowerCase().includes(search.toLowerCase()));
		});

		if (!filterChildren.length) return null;

		return filterChildren.map((child) => React.isValidElement(child)
			? React.cloneElement(child, {
				onChange: handleClickOption,
				activeValue: value,
			})
			: null);
	}, [children, search])

	return (
		<div ref={selectRef} className={cn(css.root, className)} onClick={handleOpen} >
			<Value
				value={value}
				search={search}
				disabled={disabled}
				placeholder={placeholder}
				options={options}
				valueRender={valueRender}
				isOpen={isOpen}
				showSearch={showSearch}
				setSearch={setSearch}
			/>
			{isOpen && !!menu && (
				<div className={css.overlay}>
					{menu}
				</div>
			)}
		</div>
	);
}

export default React.memo<IProps>(Select);
