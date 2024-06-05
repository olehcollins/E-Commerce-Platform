export interface JwtPayload {
	_id: string;
	name: string;
	email: string;
	isAdmin: boolean;
	iat?: number; // Issued at
	exp?: number; // Expiration time
}
