import { useContext, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CheckoutSteps from "../components/CheckoutSteps";
import LoadingBox from "../components/LoadingBox";
import { useCreateOrderMutation } from "../hooks/orderHooks.ts";
import { Store } from "../Store";
import { ApiError } from "../types/ApiError";
import { getError } from "../utiles";
import { CartItem } from "../types/CartType";
import "../stylesheets/PlaceOrderPage.css";

export default function PlaceOrderPage() {
	const navigate = useNavigate();

	const { state, dispatch } = useContext(Store);
	const { cart } = state;

	const round2 = (num: number) => Math.round(num * 100 + Number.EPSILON) / 100; // 123.2345 => 123.23

	cart.itemsPrice = round2(cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0));
	cart.shippingPrice = cart.itemsPrice > 100 ? round2(0) : round2(10);
	cart.taxPrice = round2(0.15 * cart.itemsPrice);
	cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

	const { mutateAsync: createOrder, isPending } = useCreateOrderMutation();

	const placeOrderHandler = async () => {
		try {
			const data = await createOrder({
				orderItems: cart.cartItems,
				shippingAddress: cart.shippingAddress,
				paymentMethod: cart.paymentMethod,
				itemsPrice: cart.itemsPrice,
				shippingPrice: cart.shippingPrice,
				taxPrice: cart.taxPrice,
				totalPrice: cart.totalPrice,
			});
			console.log(data);
			if (data) {
				dispatch({ type: "CART_CLEAR" });
				localStorage.removeItem("cartItems");
				navigate(`/order/${data.order._id}`);
			}
		} catch (err) {
			toast.error(getError(err as ApiError));
		}
	};

	useEffect(() => {
		if (!cart.paymentMethod) {
			navigate("/payment");
		}
	}, [cart, navigate]);

	return (
		<div className="placeoder-box">
			<Helmet>
				<title>Preview Order</title>
			</Helmet>
			<div className="order-summary-header">
				<CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
				<h1>Preview Order</h1>
			</div>
			<div className="order-container">
				<div className="o-info-cards">
					<div className="order-info-card">
						<h3 className="card-title">Shipping</h3>
						<br />
						<p className="card-text">
							<strong>Name:</strong> {cart.shippingAddress.fullName} <br />
							<strong>Address: </strong> {cart.shippingAddress.address},{cart.shippingAddress.city},{" "}
							{cart.shippingAddress.postalCode},{cart.shippingAddress.country}
						</p>
						<br />
						<a href="/shipping">Edit</a>
					</div>

					<div className="order-info-card">
						<h3 className="card-title">Payment</h3>
						<br />
						<p className="card-text">
							<strong>Method:</strong> {cart.paymentMethod}
						</p>
						<br />
						<a href="/payment">Edit</a>
					</div>

					<div className="order-info-card">
						<h3 className="card-title">Items</h3>
						<br />
						<ul className="order-items-list">
							{cart.cartItems.map((item: CartItem) => (
								<>
									<li className="item-card" key={item._id}>
										<a href={`/product/${item._id}`}>
											<img src={item.image} alt={item.name} className="c-item-img" />
										</a>
										<div className="order-item-info">
											<span>{item.name}</span>
											<span>{item.quantity}</span>
											<span>£{item.price}</span>
										</div>
									</li>
									<hr />
								</>
							))}
						</ul>
						<br />
						<a href="/cart">Edit</a>
					</div>
				</div>

				<div className="order-summary-card">
					<h3 className="card-title">Order Summary</h3>
					<ul className="summary-lists">
						<li className="summary-item">
							<div className="col">Items</div>
							<div className="col">£{cart.itemsPrice.toFixed(2)}</div>
						</li>
						<hr />
						<li className="list-group-item">
							<div className="col">Shipping</div>
							<div className="col">£{cart.shippingPrice.toFixed(2)}</div>
						</li>
						<hr />
						<li className="list-group-item">
							<div className="col">Tax</div>
							<div className="col">£{cart.taxPrice.toFixed(2)}</div>
						</li>
						<hr />
						<li className="list-group-item">
							<strong>Order Total</strong>

							<strong>£{cart.totalPrice.toFixed(2)}</strong>
						</li>

						<button
							className="order-btn"
							onClick={placeOrderHandler}
							disabled={cart.cartItems.length === 0 || isPending}
						>
							Place Order
						</button>
						{isPending && <LoadingBox></LoadingBox>}
					</ul>
				</div>
			</div>
		</div>
	);
}
