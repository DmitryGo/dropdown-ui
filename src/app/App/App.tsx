import React, {useCallback} from 'react';
import {Dropdown} from '../Dropdown';

import css from './App.module.css';

export default React.memo(function App() {
	const handleChange = useCallback(() => {}, []);

	return (
		<div className={css.root}>
			<Dropdown
				onChange={handleChange}
				options={[]}
				isSearch
				header={(
					<span>
						Header
					</span>
				)}
				bottom={(
					<span>
						Footer
					</span>
				)}
			/>
		</div>
	);
});
