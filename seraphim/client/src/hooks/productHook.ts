import { useQuery } from "@tanstack/react-query";
import apiClient from "../apiClient";
import { ProductType } from "../types/Products";

export const useGetProductsQuery = () =>
	useQuery({
		queryKey: ["products"],
		queryFn: async () => (await apiClient.get<ProductType[]>(`/products`)).data,
	});

export const useGetProductQuery = (id: string) =>
	useQuery({
		queryKey: ["product", id],
		queryFn: async () => (await apiClient.get<ProductType>(`/products/${id}`)).data,
	});

export const useSearchProductQuery = (searchTerm: string) =>
	useQuery({
		queryKey: ["product", searchTerm],
		queryFn: async () =>
			(await apiClient.get<ProductType[]>(`/products/search?searchTerm=${searchTerm}`)).data,
	});
