import cn from 'classnames';
import React from 'react';
import css from '../Option/Option.module.css';

interface IProps {
	label: string | React.ReactNode;
	children: React.ReactNode;
}

export default React.memo<IProps>(function Group({label, children}) {
	return (
		<>
			<button className={cn(css.label)}>{label}</button>
			{React.Children.map(children, child => React.isValidElement(child)
				? (
					React.cloneElement(child, {
						className: css.option
					})
				)
				: child
			)}
		</>
	);
});
