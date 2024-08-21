import { z } from 'zod';
import { foodRequestSchema, foodResponseSchema, mealSchema } from './schemas';

export type Meal = 'breakfast' | 'lunch' | 'dinner' | 'snack';

export type RadioOption = {
	value: string;
	heading: string;
	subHeading: string;
};

export type MultiSelectOption = {
	value: string;
	isIntolerance: boolean;
	checked: boolean;
};

export type FoodRequest = z.infer<typeof foodRequestSchema>;
export type FoodResponse = z.infer<typeof foodResponseSchema>;
export type MealObject = z.infer<typeof mealSchema>;

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
