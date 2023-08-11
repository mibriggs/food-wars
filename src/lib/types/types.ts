export type Option = {
	value: string;
	imageSource: string;
	message: string;
};

export type RadioOption = {
	value: string;
	heading: string;
	subHeading: string;
};

export type MultiSelectOption = {
	id: string;
	value: string;
	checked: boolean;
};

// const test = {
// 	'halal': 'Halal',
// 	'vegan': 'Vegan',
// 	'gluten-free': 'Gluten Free',
// 	'dairy-free': 'Dairy Free',
// 	'new-type': 'blah blah blah'
// } as const;

// type testType = (typeof test)[keyof typeof test];

// const testFunc = (something: testType) => {
// 	console.log(something);
// };