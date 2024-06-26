/* eslint-disable no-mixed-spaces-and-tabs */
import React from "react";
import { Cart, CartItem, ShippingAddress } from "./types/CartType.ts";
import { ProductType } from "./types/Products.ts";
import { UserInfo } from "./types/UserInfo.ts";

type AppState = {
	mode: string;
	cart: Cart;
	wishlist: ProductType[];
	userInfo?: UserInfo;
};

const initialState: AppState = {
	userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")!) : null,
	mode: localStorage.getItem("mode") ? localStorage.getItem("mode")! : "light",
	cart: {
		cartItems: localStorage.getItem("cartItems")
			? JSON.parse(localStorage.getItem("cartItems")!)
			: [],
		shippingAddress: localStorage.getItem("shippingAddress")
			? JSON.parse(localStorage.getItem("shippingAddress")!)
			: {},
		paymentMethod: localStorage.getItem("paymentMethod")
			? localStorage.getItem("paymentMethod")!
			: "PayPal",
		itemsPrice: 0,
		shippingPrice: 0,
		taxPrice: 0,
		totalPrice: 0,
	},
	wishlist: localStorage.getItem("wishlist") ? JSON.parse(localStorage.getItem("wishlist")!) : [],
};

type Action =
	| { type: "SWITCH_MODE" }
	| { type: "CART_ADD_ITEM"; payload: CartItem }
	| { type: "ADD_T0_WISHLIST"; payload: ProductType }
	| { type: "CART_REMOVE_ITEM"; payload: CartItem }
	| { type: "CART_CLEAR" }
	| { type: "WISHLIST_REMOVE_ITEM"; payload: ProductType }
	| { type: "USER_SIGNIN"; payload: UserInfo }
	| { type: "USER_SIGNOUT" }
	| { type: "SAVE_SHIPPING_ADDRESS"; payload: ShippingAddress }
	| { type: "SAVE_PAYMENT_METHOD"; payload: string };

function reducer(state: AppState, action: Action): AppState {
	switch (action.type) {
		case "SWITCH_MODE":
			localStorage.setItem("mode", state.mode === "dark" ? "light" : "dark");
			return { ...state, mode: state.mode === "dark" ? "light" : "dark" };
		case "CART_ADD_ITEM": {
			const newItem = action.payload;
			const existItem = state.cart.cartItems.find((item: CartItem) => item._id === newItem._id);
			const cartItems = existItem
				? state.cart.cartItems.map((item: CartItem) =>
						item._id === existItem._id ? newItem : item
				  )
				: [...state.cart.cartItems, newItem];

			localStorage.setItem("cartItems", JSON.stringify(cartItems));

			return { ...state, cart: { ...state.cart, cartItems } };
		}
		case "CART_REMOVE_ITEM": {
			const cartItems = state.cart.cartItems.filter(
				(item: CartItem) => item._id !== action.payload._id
			);
			localStorage.setItem("cartItems", JSON.stringify(cartItems));
			return { ...state, cart: { ...state.cart, cartItems } };
		}
		case "CART_CLEAR":
			return { ...state, cart: { ...state.cart, cartItems: [] } };
		case "ADD_T0_WISHLIST": {
			const newItem = action.payload;
			if (state.wishlist.length < 1) return { ...state, wishlist: [newItem] };
			const existItem = state.wishlist.find((item) => item._id === newItem._id);
			if (!existItem) {
				const updatedWishlist = [...state.wishlist, newItem];
				localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
				return { ...state, wishlist: updatedWishlist };
			} else {
				return state;
			}
		}
		case "WISHLIST_REMOVE_ITEM": {
			const updatedWishlist = state.wishlist.filter(
				(item: ProductType) => item._id !== action.payload._id
			);
			localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
			return { ...state, wishlist: updatedWishlist };
		}
		case "SAVE_SHIPPING_ADDRESS":
			return {
				...state,
				cart: {
					...state.cart,
					shippingAddress: action.payload,
				},
			};
		case "SAVE_PAYMENT_METHOD":
			return {
				...state,
				cart: { ...state.cart, paymentMethod: action.payload },
			};

		case "USER_SIGNIN":
			return { ...state, userInfo: action.payload };

		case "USER_SIGNOUT":
			return {
				...state,
				cart: {
					cartItems: [],
					paymentMethod: "PayPal",
					shippingAddress: {
						fullName: "",
						address: "",
						postalCode: "",
						city: "",
						country: "",
					},
					itemsPrice: 0,
					shippingPrice: 0,
					taxPrice: 0,
					totalPrice: 0,
				},
				wishlist: [],
			};
		default:
			return state;
	}
}

const defaultDispatch: React.Dispatch<Action> = () => initialState;

const Store = React.createContext({
	state: initialState,
	dispatch: defaultDispatch,
});

function StoreProvider(props: React.PropsWithChildren<object>) {
	const [state, dispatch] = React.useReducer<React.Reducer<AppState, Action>>(
		reducer,
		initialState
	);
	return <Store.Provider value={{ state, dispatch }} {...props} />;
}
export { Store, StoreProvider };
