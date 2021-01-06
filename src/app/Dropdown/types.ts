export type TOption = Readonly<{
	value: string | number;
	text: string;
	description?: string;
	icon?: string;
	flag?: string;
	image?: string;
	colorText?: string;
	dotColor?: string;
	disabled?: string;
	link?: string;
	linkText?: string;
	linkImage?: string;
	isChild?: boolean;
	children?: ReadonlyArray<string | number>;
}>

export type TValue = string | number | ReadonlyArray<string | number>;
