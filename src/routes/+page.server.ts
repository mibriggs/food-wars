import { foodRequestSchema } from '$types/schemas';
import { redirect, type Actions } from '@sveltejs/kit';

export const actions = {
	getMeals: async ({ request }) => {
		const formData = await request.formData();
		const mealObject = formData.get('mealObject');

		if (mealObject !== null) {
			const maybeFoodRequest = foodRequestSchema.safeParse(JSON.parse(mealObject.toString()));
			if (maybeFoodRequest.success) {
				throw redirect(300, `/fight?req=${mealObject}`);
			}
		}
	}
} satisfies Actions;
