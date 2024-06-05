import { Link } from "react-router-dom";
import { ProductType } from "../types/Products";
import { Stars } from "../components/Stars";
import { MouseEventHandler, useContext, useState } from "react";
import { Store } from "../Store";
import { CartItem } from "../types/CartType";
import { toast } from "react-toastify";
import { Heartsvg } from "./Heartsvg";

interface Review {
	customer: string;
	caption: string;
	stars: number;
}
const avgReview = (reviews: Review[]) => {
	const totalScore = reviews.reduce((acc, review) => {
		return (acc += review.stars);
	}, 0);
	return totalScore / reviews.length;
};

interface PProps extends ProductType {
	product: ProductType;
}

const Product = ({ _id, name, price, description, image, reviews, product }: PProps) => {
	const { state, dispatch } = useContext(Store);
	const {
		cart: { cartItems },
	} = state;
	const [Heart, setHeart] = useState(false);

	const addToCartHandler = (item: CartItem) => {
		const existItem = cartItems.find((x) => x._id === product._id);
		const quantity = existItem ? existItem.quantity + 1 : 1;
		if (product.countInStock < quantity) {
			alert("Sorry. Product is out of stock");
			return;
		}
		dispatch({
			type: "CART_ADD_ITEM",
			payload: { ...item, quantity },
		});
		toast.success("Product added to the cart", {
			autoClose: 2000,
			style: {
				color: "green",
			},
		});
	};

	const handleClick: MouseEventHandler = () => {
		addToCartHandler(product as unknown as CartItem);
	};

	const handleMouseEnter = () => {
		setHeart(true);
	};
	const handleMouseLeave = () => {
		setHeart(false);
	};

	return (
		<li
			onMouseLeave={handleMouseLeave}
			onMouseEnter={handleMouseEnter}
			className="product-card"
			key={_id}
		>
			{Heart && <Heartsvg product={product} />}

			<Link to={`/product/${_id}`}>
				<img src={image} alt={description} className="product-image" />
			</Link>
			<div className="product-details">
				<div className="review-box">
					<Stars stars={avgReview(reviews)} />
					<span>{reviews.length} reviews</span>
				</div>
				<h2>
					{name} <span>£{price.toFixed(2)}</span>
				</h2>
				<button className="add-cart" onClick={handleClick}>
					Add to Cart
				</button>
			</div>
		</li>
	);
};

export default Product;
