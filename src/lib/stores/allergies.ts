import { writable } from "svelte/store";

export const allergiesStore = writable<string[]>([]);