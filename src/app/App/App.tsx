import React, {
	useCallback,
	useState,
} from 'react';
import {
	Select,
	Option,
} from '../Select';
import {TValue} from '../Dropdown/types';

import css from './App.module.css';

const OPTIONS = [
	{
		value: 'all',
		text: 'All',
	},
	{
		value: 'all_text',
		text: 'All Text',
		data: {
			description: 'Contain all text',
		},
		options: [
			{
				value: 'text',
				text: 'Text',
			},
			{
				value: 'text2',
				text: 'Text 2',
			},
		],
	},
	{
		value: 'big',
		text: 'Vey big name Vey big name Vey big name',
		options: [
			{
				value: 'text3',
				text: 'Text 3',
			},
			{
				value: 'text4',
				text: 'Text 4',
			},
		],
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
			<Select
				value={value}
				onChange={handleChange}
			>
				{OPTIONS.map((option, key) => (
					<Option key={key} value={option.value} data={option} />
				))}
			</Select>
		</div>
	);
});
