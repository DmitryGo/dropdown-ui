import cn from 'classnames';
import React from 'react';

import css from './Option.module.css';

interface IProps {
	className?: string;
}

export default React.memo<IProps>(function Option({className}) {
	// TODO: Сделать проверку на группы и подставлять компонент группы, если требуется
	return (
		<button className={cn(css.option, className)}>
			Option
		</button>
	);
});
