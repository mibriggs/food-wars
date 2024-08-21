import { z } from 'zod';

export const foodRequestSchema = z.object({
	time: z
		.number()
		.min(15)
		.max(60 * 4),
	mealType: z.string().optional(),
	calories: z.string().optional(),
	intolerances: z.string().array(),
	diets: z.string().array(),
	cuisines: z.string().array(),
	ingredients: z.string().array(),
	count: z.number().min(4).max(64)
});

export const mealSchema = z.object({
	id: z.number(),
	title: z.string(),
	image: z.string(),
	imageType: z.string(),
	vegetarian: z.boolean(),
	vegan: z.boolean(),
	glutenFree: z.boolean(),
	dairyFree: z.boolean(),
	veryHealthy: z.boolean(),
	cheap: z.boolean(),
	veryPopular: z.boolean(),
	sustainable: z.boolean(),
	lowFodmap: z.boolean(),
	weightWatcherSmartPoints: z.number(),
	gaps: z.string(),
	preparationMinutes: z.number().nullable(),
	cookingMinutes: z.number().nullable(),
	aggregateLikes: z.number(),
	healthScore: z.number(),
	creditsText: z.string(),
	license: z.string().optional(),
	sourceName: z.string(),
	pricePerServing: z.number(),
	readyInMinutes: z.number(),
	servings: z.number(),
	sourceUrl: z.string(),
	summary: z.string(),
	cuisines: z.string().array(),
	dishTypes: z.string().array(),
	diets: z.string().array(),
	occasions: z.string().array(),
	analyzedInstructions: z
		.object({
			name: z.string(),
			steps: z
				.object({
					eqipment: z
						.object({
							id: z.number(),
							image: z.string(),
							name: z.string(),
							temperature: z.object({
								number: z.number(),
								unit: z.string()
							})
						})
						.array()
						.optional(),
					ingredients: z
						.object({
							id: z.number(),
							image: z.string(),
							name: z.string()
						})
						.array(),
					number: z.number(),
					step: z.string()
				})
				.array()
		})
		.array()
		.optional(),
	spoonacularScore: z.number(),
	spoonacularSourceUrl: z.string(),
	nutrition: z.object({
		nutrients: z
			.object({
				name: z.string(),
				amount: z.number(),
				unit: z.string()
			})
			.array()
	})
});

export const foodResponseSchema = z.object({
	results: mealSchema.array(),
	offset: z.number(),
	number: z.number(),
	totalResults: z.number()
});
