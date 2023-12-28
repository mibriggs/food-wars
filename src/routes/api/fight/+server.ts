import { SECRET_KEY_SPOONACULAR } from '$env/static/private';
import { foodRequestSchema, type FoodRequest, foodResponseSchema, type FoodResponse } from '$lib/types/schemas';
import { error, json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request, locals }) => {
	const body = await request.json();
	const maybeBody = foodRequestSchema.safeParse(body);

	if (maybeBody.success) {
		const data: FoodRequest = maybeBody.data;
        const queryParams: string[] = [
            `maxReadyTimes=${data.time}`,
            data.mealType? getMeal(data.mealType) : "minCalories=100&maxCalories=3000",
            data.calories? getCalories(data.calories) : "",
            data.intolerances.length === 0? "" : "intolerances="+data.intolerances.join(","),
            data.diets.length === 0? "" : "diet="+data.diets.join(","),
            data.cuisines.length === 0? "" : "cuisines="+data.cuisines.join(","),
            data.ingredients.length === 0? "" : "includeIngredients="+data.ingredients.join(","),
            `number=${data.count}`,
            `apiKey=${SECRET_KEY_SPOONACULAR}`
        ];
        const queryParmsString = queryParams.filter(qp => qp !== "").join('&');
		
        const urlToFetch = `https://api.spoonacular.com/recipes/complexSearch?${queryParmsString}`;
        const res = await fetch(urlToFetch);
        const resBody = await res.json() as unknown;
        
        const maybeResBody = foodResponseSchema.safeParse(resBody);
        if (maybeResBody.success) {
            const resData: FoodResponse = maybeResBody.data;
            return json(resData)
        }
        else {
            throw error(400, maybeResBody.error)
        }
	}
    else {
        throw error(400, maybeBody.error)
    }
};

function getMeal(meal: string): string {
    if (meal == "breakfast" || meal == "snack") {
        return `type=${meal}`
    }
    else {
        return 'type=main course,fingerfood,side dish,dessert,soup,appetizer,salad'
    }
};

function getCalories(calories: string): string {
    let minCal: number, maxCal: number;
    if (calories == "low") {
        minCal = 100;
        maxCal = 499;
    }
    else if (calories == "medium") {
        minCal = 500;
        maxCal = 799;
    }
    else {
        minCal = 800;
        maxCal = 2000;
    }
    return `minCalories=${minCal}&maxCalories=${maxCal}`;
}

