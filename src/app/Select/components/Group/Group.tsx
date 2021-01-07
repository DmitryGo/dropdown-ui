import cn from 'classnames';
import React from 'react';
import {TOption} from '../../types';

import css from './Group.module.css';

interface IProps {
	label: string | React.ReactNode;
	data: TOption;
	children: React.ReactNode;
}

export default React.memo<IProps>(function Group({label, children, data}) {
	return (
		<>
			<button className={cn(css.label)} value={data.value}>{label}</button>
			{React.Children.map(children, child => React.isValidElement(child)
				? (
					React.cloneElement(child, {
						className: css.option,
					})
				)
				: child
			)}
		</>
	);
});
