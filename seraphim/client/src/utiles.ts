import { ApiError } from "./types/ApiError";
import { CartItem } from "./types/CartType";
import { ProductType } from "./types/Products";

export const getError = (error: ApiError): string => {
	return error.response && error.response.data.message
		? error.response.data.message
		: error.message;
};

export const convertProductToCartItem = (product: ProductType): CartItem => {
	const cartItem: CartItem = {
		name: product.name,
		_id: product._id,
		image: product.image,
		price: product.price,
		countInStock: product.countInStock,
		quantity: 1,
	};
	return cartItem;
};
