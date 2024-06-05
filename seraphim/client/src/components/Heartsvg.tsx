import { Store } from "../Store";
import { toast } from "react-toastify";
import { ProductType } from "../types/Products";
import { MouseEventHandler, useContext } from "react";
import { useNavigate } from "react-router-dom";

interface HeartSvgProps {
	product: ProductType;
}

export const Heartsvg = ({ product }: HeartSvgProps) => {
	const { dispatch } = useContext(Store);
	const { state: userInfo } = useContext(Store);
	const navigate = useNavigate();

	const addToWishList: MouseEventHandler = () => {
		if (!userInfo) return navigate("/signin");
		dispatch({
			type: "ADD_T0_WISHLIST",
			payload: product,
		});
		toast.success("Product added to wishlist", {
			autoClose: 1200,
			style: {
				color: "green",
			},
		});
	};

	return (
		<svg
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
			className="heart-svg"
			onClick={addToWishList}
		>
			<g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
			<g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
			<g id="SVGRepo_iconCarrier">
				{" "}
				<path d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z"></path>{" "}
			</g>
		</svg>
	);
};
