import cn from 'classnames';
import React, {useCallback} from 'react';
import {
	TOption,
	TValue,
} from '../../types';

import css from './Option.module.css';

interface IProps {
	value: string | number;
	activeValue?: TValue;
	data?: TOption;
	disabled?: boolean;
	className?: string;
	onChange?: (arg: TValue) => void;
	children?: React.ReactNode;
}

export default React.memo<IProps>(function Option({className, value, disabled, data, children, onChange, activeValue}) {
	const handleClick = useCallback((event: React.SyntheticEvent<HTMLButtonElement>) => {
		event.stopPropagation();

		if (onChange) {
			onChange(event.currentTarget.value);
		}
	}, [onChange]);

	return (
		<button
			onClick={handleClick}
			className={cn(
				css.option,
				activeValue && data?.value === activeValue && css.selected,
				className,
			)}
			value={data?.value}
		>
			{children ? children : <div className={css.text}>{data?.text}</div>}
		</button>
	);
});
