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

const handleSpecialCharacters = (str: string): string => {
	const words = str
		.replace(/[^a-zA-Z0-9]+/g, " ")
		.trim()
		.split(/\s+/);

	// Convert to camelCase
	return words
		.map((word, index) => {
			// Convert first word to lowercase, capitalize others
			return index === 0
				? word.toLowerCase()
				: word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
		})
		.join("");
};

export const createTypeFromJson = (
	json: object,
	typeName = "GeneratedType",
): string => {
	// biome-ignore lint/suspicious/noExplicitAny: object can be any
	const parseJsonToTs = (obj: any, level = 0): string => {
		const indentation = "  ".repeat(level); // Create proper indentation based on nesting level

		if (obj === null) return "null";
		if (Array.isArray(obj)) {
			if (obj.length === 0) return "never[]"; // Handle empty arrays
			const uniqueTypes = Array.from(
				// biome-ignore lint/suspicious/noExplicitAny: can be any
				new Set(obj.map((item: any) => parseJsonToTs(item, level))),
			);
			return `(${uniqueTypes.join(" | ")})[]`;
		}

		switch (typeof obj) {
			case "string":
				return "string";
			case "number":
				return "number";
			case "boolean":
				return "boolean";
			case "object":
				if (obj === null) return "null"; // Handle null explicitly as an object
				return `{
${Object.entries(obj)
	.map(
		([key, value]) =>
			`${indentation}  ${handleSpecialCharacters(key)}: ${parseJsonToTs(value, level + 1)};`,
	)
	.join("\n")}
${indentation}}`;
			default:
				return "any";
		}
	};

	const typeDefinition = parseJsonToTs(json);
	return `type ${typeName} = ${typeDefinition};`;
};

export const tsTokenPatterns = [
	{
		type: "keyword",
		pattern: /\b(type|string|number|boolean|any|readonly|extends|interface)\b/,
		className: "text-blue-500",
	},
	{ type: "key", pattern: /\b[a-z][a-zA-Z0-9]*\b/, className: "text-teal-500" }, // camelCase keys
	{
		type: "type",
		pattern: /\b[A-Z][a-zA-Z0-9]*\b/,
		className: "text-green-500",
	}, // PascalCase types
	{ type: "number", pattern: /\b\d+\b/, className: "text-purple-500" },
	{
		type: "string",
		pattern: /"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/,
		className: "text-red-500",
	},
	{
		type: "boolean",
		pattern: /\b(true|false)\b/,
		className: "text-yellow-500",
	},
	{ type: "punctuation", pattern: /[{}[\];():,]/, className: "text-gray-400" },
	{ type: "whitespace", pattern: /\s+/, className: "" }, // Preserve indentation
];

export const jsonTokenPatterns = [
	{ type: "key", pattern: /"[^"]+":/, className: "text-pink-400" },
	{ type: "string", pattern: /: "[^"]+"/, className: "text-green-400" },
	{ type: "number", pattern: /: -?\d+\.?\d*/, className: "text-blue-400" },
	{
		type: "boolean",
		pattern: /: (?:true|false)/,
		className: "text-purple-400",
	},
	{ type: "bracket", pattern: /[\[\]{}]/, className: "text-yellow-400" },
	{ type: "comma", pattern: /,/, className: "text-gray-400" },
	{ type: "whitespace", pattern: /\s+/, className: "" },
];
