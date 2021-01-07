import {ReactElement} from 'react';

export type TValue = string | number | ReadonlyArray<string | number>;

export type TOption<T = unknown> = {
	value: string | number;
	text: string | ReactElement;
	disabled?: boolean;
	options?: ReadonlyArray<TOption<T>>;
	data: T; // для рендера кастомных данных
}