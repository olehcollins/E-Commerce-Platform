import { MouseEventHandler, useContext, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { ApiError } from "../types/ApiError";
import { convertProductToCartItem, getError } from "../utiles";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Reviews from "../components/Reviews";
import "../stylesheets/ProductPage.css";
import { Stars } from "../components/Stars";
import ReviewForm from "../components/ReviewForm";
import { Helmet } from "react-helmet-async";
import { useGetProductQuery } from "../hooks/productHook";
import { Store } from "../Store";
import { toast } from "react-toastify";

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

const ProductPage = () => {
	const { id } = useParams();
	// const navigate = useNavigate();
	const { state, dispatch } = useContext(Store);
	const { cart } = state;
	const [Rating, setRating] = useState<number>(0);
	const { data: product, isLoading, error } = useGetProductQuery(id as string);
	const { state: userInfo } = useContext(Store);
	const navigate = useNavigate();

	const addToCartHandler = () => {
		const existItem = cart.cartItems.find((x) => x._id === product!._id);
		const quantity = existItem ? existItem.quantity + 1 : 1;
		if (product!.countInStock < quantity) {
			toast.warn("Sorry. Product is out of stock");
			return;
		}
		dispatch({
			type: "CART_ADD_ITEM",
			payload: { ...convertProductToCartItem(product!), quantity },
		});
		toast.success("Product added to the cart", {
			autoClose: 2000,
		});
		// navigate("/cart");
	};

	const handleClick: MouseEventHandler = () => {
		userInfo ? addToCartHandler() : navigate("/signin");
	};

	return isLoading ? (
		<LoadingBox />
	) : error ? (
		<MessageBox>{getError(error as unknown as ApiError)} </MessageBox>
	) : (
		<>
			<div className="product-box" key={product!._id}>
				<Helmet>
					<title>{product!.name}</title>
				</Helmet>
				<div className="image-review ">
					<img src={product!.image} alt={product!.name} className="product-image" />
					{userInfo ? <ReviewForm Rating={Rating} setRating={setRating} product={product!} /> : ""}
				</div>
				<div className="product-info">
					<div className="product-cart">
						<div className="product-details">
							<div className="review-box">
								<h2>{product!.name}</h2>
								<div className="nums-review">
									<Stars stars={avgReview(product!.reviews)} />
									<p style={{ textAlign: "center" }}>{product!.reviews.length} reviews</p>
								</div>
							</div>
							<hr />
							<h3>
								Price: <span>£{product!.price.toFixed(2)}</span>
							</h3>
							<hr />
							<h3>
								Description:<h5>{product!.description}</h5>
							</h3>
							<hr />
							<h3>
								Category:<h5>{product!.category}</h5>
							</h3>
						</div>
						<div className="cart">
							<div className="status">
								<h3>Price:</h3> <h3>£{product!.price}</h3>
							</div>
							<hr />
							<div className="status">
								<h3>Status:</h3>
								{product!.countInStock > 0 ? (
									<span className="instock">In Stock</span>
								) : (
									<span className="outstock">In Stock</span>
								)}
							</div>
							<hr />
							<div className="button-cart">
								<button className="add-cart" onClick={handleClick}>
									Add to Cart
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="reviews">
				<h2>Reviews</h2>
				<Reviews reviews={product!.reviews} />
			</div>
		</>
	);
};

export default ProductPage;
