import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const validateJson = (json: string) => {
	try {
		JSON.parse(json);
	} catch (error) {
		return false;
	}
	return true;
};
