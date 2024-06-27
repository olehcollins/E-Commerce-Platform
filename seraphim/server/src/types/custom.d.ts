// types/custom.d.ts

declare module "cacheable-request" {
	interface ResponseLike {
		statusCode: number;
		statusMessage: string;
		headers: Record<string, string | string[]>;
		url: string;
		body: unknown;
	}

	// Add other necessary type declarations here if required.
}
