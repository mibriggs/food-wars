import type { MealObject } from '$lib/types/schemas';
import { writable } from 'svelte/store';

const createStore = (defaultVal: string[]) => {
	const { subscribe, set, update } = writable(defaultVal);
	return {
		subscribe,
		set,
		update,
		addItem: (newItem: string) => {
			update((currVal) => [...currVal, newItem]);
		},
		deleteItem: (itemToDelete: string) => {
			update((currVal) => currVal.filter((item) => item !== itemToDelete));
		}
	};
};

export const intolerancesStore = createStore([]);
export const dietsStore = createStore([]);
export const cuisinesStore = createStore([]);
export const ingredientsStore = createStore([]);
export const mealsStore = writable<MealObject[]>();
