import React, {
	useCallback,
} from 'react';
import cn from 'classnames';

import {useSelect} from './hooks/useSelect';
import {
	TValue,
} from './types';

import css from './Select.module.css';

interface IProps {
	children: React.ReactNode;
	value?: TValue;
	className?: string;
	placeholder?: string;
	onChange: (arg: TValue) => void;
}

function Select({
	value,
	className,
	onChange,
	placeholder = 'Select',
	children,
}: IProps) {
	const {selectRef, isOpen, open, close} = useSelect();

	const handleClickOption = useCallback((arg: TValue) => {
		onChange(arg);
		close();
	}, [onChange, close]);

	return (
		<div ref={selectRef} className={cn(css.root, className)} onClick={open} >
			<div className={css.select}>
				<span className={css.value}>{placeholder}</span>
			</div>
			{isOpen && (
				<div className={css.overlay}>
					{React.Children.map(children, child => React.isValidElement(child)
						? (
							React.cloneElement(child, {
								onChange: handleClickOption,
								activeValue: value,
							})
						)
						: child
					)}
				</div>
			)}
		</div>
	);
}

export default React.memo<IProps>(Select);
