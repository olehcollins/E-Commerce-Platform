import "express";

declare module "express-serve-static-core" {
	interface Request {
		user: {
			_id: string;
			name: string;
			email: string;
			isAdmin: boolean;
			token: string;
		};
	}
}
