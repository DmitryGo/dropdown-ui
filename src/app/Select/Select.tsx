import React, {
	useCallback,
} from 'react';
import cn from 'classnames';

import {useSelect} from './hooks/useSelect';
import {
	TOption,
	TValue,
} from './types';

import css from './Select.module.css';

interface IProps {
	children: React.ReactNode;
	value: TValue;
	disabled?: boolean;
	loading?: boolean;
	multiple?: 'union' | 'tags';
	className?: string;
	classNameOverlay?: string;
	placeholder?: string;
	position?: string;
	showSearch?: boolean;
	onChange: (arg: TValue) => void;
	valueRender?: (arg: TValue, data?: TOption) => React.ReactNode;
	popupRender?: (option: React.ReactNode) => React.ReactNode;
}

function Select({
	value,
	className,
	classNameOverlay,
	placeholder = 'Select',
	disabled,
	children,
	showSearch,
	multiple,
	valueRender,
	popupRender,
}: IProps) {
	const {selectRef, isOpen, open, close} = useSelect();
	const handleOpen = useCallback(() => {
		if (!disabled) {
			open();
		}
	}, [disabled, open]);

	return (
		<div ref={selectRef} className={cn(css.root, className)} onClick={handleOpen} >
			<div className={cn(css.select, disabled && css.disabled)}>
				{value && valueRender ? valueRender(value) : null}
				{!Array.isArray(value) && !valueRender ? <span className={css.value}>{value}</span> : null}
				{Array.isArray(value) && !valueRender ? <span className={css.value}>Selected: {value.length}</span> : null}
				{!value && placeholder ? <span className={css.value}>{placeholder}</span> : null}
				{showSearch ? (
					<span className={cn(css.search, isOpen && css.searchActive)}>
						<input
							className={css.input}
							autoComplete="off"
							value=""
						/>
					</span>
				) : null}
			</div>
			{isOpen && (
				<div className={cn(css.overlay, classNameOverlay)}>
					{popupRender
						? popupRender(children)
						: React.Children.map(children, child => React.isValidElement(child)
							? (
								React.cloneElement(child, {
								// TODO: Пробрасывать нужные свойства
								})
							)
							: child
						)
					}
				</div>
			)}
		</div>
	);
}

export default React.memo<IProps>(Select);
