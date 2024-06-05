import { useMutation } from "@tanstack/react-query";
import apiClient from "../apiClient";
import { UpdateUserInfo, UserInfo } from "../types/UserInfo";

export const useSigninMutation = () =>
	useMutation({
		mutationFn: async ({ email, password }: { email: string; password: string }) =>
			(
				await apiClient.post<UserInfo>(`/auth`, {
					email,
					password,
				})
			).data,
	});
export const useSignoutMutation = () =>
	useMutation({
		mutationFn: async (email: string) =>
			(await apiClient.post<UserInfo>(`/signout`, { email: email })).data,
	});

export const useSignupMutation = () =>
	useMutation({
		mutationFn: async ({
			name,
			email,
			password,
			profileImage,
		}: {
			name: string;
			email: string;
			password: string;
			profileImage: string;
		}) =>
			(
				await apiClient.post<UserInfo>(`/users/customer`, {
					name,
					email,
					password,
					profileImage,
				})
			).data,
	});
export const useUpdateMutation = () =>
	useMutation({
		mutationFn: async (userInfo: UpdateUserInfo) =>
			(
				await apiClient.put(
					"/users/customer",
					{
						id: userInfo.id,
						name: userInfo.name,
						email: userInfo.email,
						password: userInfo.password,
						profileImage: userInfo.profileImage,
					},
					{
						headers: {
							Authorization: `Bearer ${userInfo.refreshToken}`,
						},
					}
				)
			).data,
	});
