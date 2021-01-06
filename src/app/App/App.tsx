import React, {
	useCallback,
	useState,
} from 'react';
import {Dropdown} from '../Dropdown';
import {TValue} from '../Dropdown/types';

import css from './App.module.css';

const OPTIONS = [
	{
		value: 'all',
		text: 'All',
		description: 'Contain all values',
	},
	{
		value: 'all_text',
		text: 'All Text',
		description: 'Contain all text',
		children: ['text'],
	},
	{
		value: 'text',
		text: 'Text',
		isChild: true,
	},
	{
		value: 'big',
		text: 'Vey big name Vey big name Vey big name',
		description: 'Very big description Very big description Very big description',
	},
] as const;

const DEFAULT_VALUE = 'all';

export default React.memo(function App() {
	const [value, setValue] = useState<TValue>([DEFAULT_VALUE]);
	const handleChange = useCallback((newValue: TValue) => {
		setValue(newValue);
	}, []);

	return (
		<div className={css.root}>
			<Dropdown
				onChange={handleChange}
				value={value}
				defaultValue={DEFAULT_VALUE}
				options={OPTIONS}
				multiple
			/>
		</div>
	);
});
