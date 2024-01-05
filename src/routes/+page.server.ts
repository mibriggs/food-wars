import { foodRequestSchema } from '$types/schemas';
import { redirect, type Actions } from '@sveltejs/kit';

export const actions = {
	getMeals: async ({ request }) => {
		const formData = await request.formData();
		const mealObject = formData.get('mealObject');

		if (mealObject !== null) {
			const maybeFoodRequest = foodRequestSchema.safeParse(JSON.parse(mealObject.toString()));
			if (maybeFoodRequest.success) {
				const redirectToUrl = `/fight?req=${mealObject}`;
				throw redirect(300, `${encodeURI(redirectToUrl)}`);
			}
		}
	}
} satisfies Actions;
