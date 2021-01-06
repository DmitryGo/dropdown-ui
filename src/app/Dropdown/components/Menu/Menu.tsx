import React, {
	useCallback,
} from 'react';
import cn from 'classnames';

import {TOption, TValue} from '../../types';

import css from './Menu.module.css';


interface IProps<T extends TOption> {
	value: ReadonlyArray<string | number>;
	onSelect: (arg: string | number) => void;
	options: ReadonlyArray<T>;
	className?: string;
	multiple?: boolean;
	defaultValue?: TValue;
}

function Menu<T extends TOption>({
	value,
	className,
	options,
	onSelect,
	multiple,
}: IProps<T>) {
	const handleClick = useCallback((event: React.SyntheticEvent<HTMLButtonElement>) => {
		event.stopPropagation();
		onSelect(event.currentTarget.value)
	}, [onSelect]);

	return (
		<div className={cn(css.root, className)}>
			{options.map(option => (
				<button
					key={option.value}
					className={cn(css.option, option.isChild && css.child, {
						[css.selected]: value.includes(option.value)
					})}
					value={option.value}
					onClick={handleClick}
				>
					<div className={css.content}>
						<div className={css.text}>
							{option.text}
						</div>
						{option.description ? <div className={css.description}>{option.description}</div> : null}
						{option.link ? <a href={option.link} className={css.link}>{option.linkText}</a> : null}
					</div>
					{multiple && value.includes(option.value) ? (<div className={css.remove}>x</div>) : null}
				</button>
			))}
		</div>
	);
}

// open issue https://github.com/DefinitelyTyped/DefinitelyTyped/issues/37087
const typedMemo: <T>(c: T) => T = React.memo;

export default typedMemo(Menu);
