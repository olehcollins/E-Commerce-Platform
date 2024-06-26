export type UserInfo = {
	id: string;
	name: string;
	email: string;
	token: string;
	isAdmin: boolean;
	refreshToken?: string;
	profileImage?: string;
};

export type UpdateUserInfo = {
	id: string;
	name: string;
	email: string;
	password: string;
	refreshToken: string;
	profileImage?: string;
};

export type deleteAccountInfo = {
	id: string;
	refreshToken: string;
};

export type User = {
	id: string;
	name: string;
	email: string;
	password: string;
	refreshToken: string;
};
