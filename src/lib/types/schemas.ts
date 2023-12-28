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
    nutrition: z.object({
        nutrients: z.object({
            name: z.string(),
            amount: z.number(),
            unit: z.string()
        }).array()
    })
});

export const foodResponseSchema = z.object({
    results: mealSchema.array(),
    offset: z.number(),
    number: z.number(),
    totalResults: z.number()
});

export type FoodRequest = z.infer<typeof foodRequestSchema>;
export type FoodResponse = z.infer<typeof foodResponseSchema>;
export type MealObject = z.infer<typeof mealSchema>;
