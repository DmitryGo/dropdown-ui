import React from 'react';
import {Dropdown} from '../Dropdown';

import css from './App.module.css';

export default React.memo(function App() {
	return (
		<div className={css.root}>
			<Dropdown />
		</div>
	);
});
