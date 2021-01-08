import cn from 'classnames';
import React from 'react';
import {TOption} from '../../types';
import {Group} from '../Group';

import css from './Option.module.css';

interface IProps {
	value: string | number;
	data?: TOption;
	disabled?: boolean;
	className?: string;
	children?: React.ReactNode;
}

export default React.memo<IProps>(function Option({className, value, disabled, data, children}) {
	if (data?.options?.length) {
		return (
			<Group
				label={<div>{data.text}</div>}
				data={data}
			>
				{data.options.map(option => (
					<Option
						key={option.value}
						value={option.value}
						data={option}
						disabled={option.disabled}
					/>
				))}
			</Group>
		);
	}

	return (
		<button className={cn(css.option, className)} value={data?.value}>
			{children ? children : <div className={css.text}>{data?.text}</div>}
		</button>
	);
});
