import jwt, { JwtPayload } from "jsonwebtoken";

export const generateAccessToken = (user: JwtPayload) => {
	return jwt.sign(
		{
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
		},
		process.env.JWT_ACCESS_TOKEN_SECRET || "somethingsecret",
		{
			expiresIn: "1d",
		}
	);
};
export const generateRefreshToken = (user: JwtPayload) => {
	return jwt.sign(
		{
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
		},
		process.env.JWT_REFRESH_TOKEN_SECRET || "somethingsecret",
		{
			expiresIn: "14d",
		}
	);
};
