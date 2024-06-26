import { useMutation, useQuery } from "@tanstack/react-query";
import apiClient from "../apiClient.ts";
import { CartItem, ShippingAddress } from "../types/CartType.ts";
import { Order } from "../types/Order.ts";

export const useCreateOrderMutation = () =>
	useMutation({
		mutationFn: async (order: {
			orderItems: CartItem[];
			shippingAddress: ShippingAddress;
			paymentMethod: string;
			itemsPrice: number;
			shippingPrice: number;
			taxPrice: number;
			totalPrice: number;
		}) =>
			(
				await apiClient.post<{
					message: string;
					order: Order;
				}>("/orders", order)
			).data,
	});

export const useGetPaypalClientIdQuery = () =>
	useQuery({
		queryKey: ["paypal-clientId"],
		queryFn: async () => (await apiClient.get<{ clientId: string }>(`/keys/paypal`)).data,
	});

export const usePayOrderMutation = () =>
	useMutation({
		mutationFn: async (details: { orderId: string }) =>
			(
				await apiClient.put<{ message: string; order: Order }>(
					`/orders/${details.orderId}/pay`,
					details
				)
			).data,
	});

export const useGetOrderDetailsQuery = (id: string) =>
	useQuery({
		queryKey: ["orders", id],
		queryFn: async () => (await apiClient.get<Order>(`/orders/${id}`)).data,
	});
