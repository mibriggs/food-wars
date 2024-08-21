import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';
import { type FoodRequest, type FoodResponse, type MealObject } from '$lib/types/types';
import { SECRET_KEY_SPOONACULAR } from '$env/static/private';
import { foodRequestSchema, foodResponseSchema } from '$types/schemas';

export const load: PageServerLoad = async ({ url }) => {
	if (!url.searchParams.has('req')) throw redirect(302, '/');

	const urlReqSearchParams = url.searchParams.get('req');
	if (urlReqSearchParams === null) throw redirect(302, '/');

	try {
		const parsedObject = JSON.parse(urlReqSearchParams) as unknown; // making sure we can parse search param to a json object
		const maybeFoodRequest = foodRequestSchema.safeParse(parsedObject); // make sure parsed object fits shape we want it to
		if (!maybeFoodRequest.success) throw redirect(302, '/'); // redirect if it doesn't
		const foodRequest: FoodRequest = maybeFoodRequest.data;
		const queryParmsString = constructQueryParams(foodRequest);

		const urlToFetch = `https://api.spoonacular.com/recipes/complexSearch?${queryParmsString}`;
		const res = await fetch(urlToFetch);
		const resBody = (await res.json()) as unknown;

		if (!res.ok) throw new Error('Something went wrong');

		const maybeResBody = foodResponseSchema.safeParse(resBody);
		if (maybeResBody.success) {
			const resData: FoodResponse = maybeResBody.data;
			const meals: MealObject[] = resData.results.map((meal) => meal);
			return { meals: meals };
		} else {
			console.log(maybeResBody.error.errors);
		}
	} catch (err) {
		throw redirect(302, '/');
	}
};

const constructQueryParams = (requestObject: FoodRequest): string => {
	const queryParams: string[] = [
		`maxReadyTime=${requestObject.time}`,
		requestObject.mealType ? getMeal(requestObject.mealType) : 'minCalories=100&maxCalories=3000',
		requestObject.calories ? getCalories(requestObject.calories) : '',
		requestObject.intolerances.length === 0
			? ''
			: 'intolerances=' + requestObject.intolerances.join(','),
		requestObject.diets.length === 0 ? '' : 'diet=' + requestObject.diets.join(','),
		requestObject.cuisines.length === 0 ? '' : 'cuisines=' + requestObject.cuisines.join(','),
		requestObject.ingredients.length === 0
			? ''
			: 'includeIngredients=' + requestObject.ingredients.join(','),
		`number=${requestObject.count}`,
		`apiKey=${SECRET_KEY_SPOONACULAR}`,
		'addRecipeInformation=true'
	];
	return queryParams.filter((qp) => qp !== '').join('&');
};

const getMeal = (meal: string): string => {
	if (meal == 'breakfast' || meal == 'snack') {
		return `type=${meal}`;
	} else {
		return 'type=main course,fingerfood,side dish,dessert,soup,appetizer,salad';
	}
};

const getCalories = (calories: string): string => {
	let minCal: number, maxCal: number;
	if (calories == 'low') {
		minCal = 100;
		maxCal = 499;
	} else if (calories == 'medium') {
		minCal = 500;
		maxCal = 799;
	} else {
		minCal = 800;
		maxCal = 3000;
	}
	return `minCalories=${minCal}&maxCalories=${maxCal}`;
};
