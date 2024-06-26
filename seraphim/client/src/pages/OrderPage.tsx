// import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import LoadingBox from "../components/LoadingBox";
import { useGetOrderDetailsQuery } from "../hooks/orderHooks.ts";
// import { Store } from "../Store";
import { ApiError } from "../types/ApiError";
import { getError } from "../utiles";
import { CartItem } from "../types/CartType";
import "../stylesheets/PlaceOrderPage.css";
import MessageBox from "../components/MessageBox.tsx";

export default function OrderPage() {
	// const {
	// 	state: { userInfo },
	// } = useContext(Store);

	const params = useParams();
	const { id: orderId } = params;
	const { data: order, isLoading, error } = useGetOrderDetailsQuery(orderId!);

	return isLoading ? (
		<LoadingBox></LoadingBox>
	) : error ? (
		<MessageBox variant="danger">{getError(error as unknown as ApiError)}</MessageBox>
	) : !order ? (
		<MessageBox variant="danger">Order Not Found</MessageBox>
	) : (
		<div className="oder-box">
			<Helmet>
				<title>Order {order._id}</title>
			</Helmet>
			<div className="order-summary-header">
				<CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
				<h1>Order: {order._id}</h1>
			</div>
			<div className="order-container">
				<div className="o-info-cards">
					<div className="order-info-card">
						<h3 className="card-title">Shipping</h3>
						<br />
						<p className="card-text">
							<strong>Name:</strong> {order.shippingAddress.fullName} <br />
							<strong>Address: </strong> {order.shippingAddress.address},
							{order.shippingAddress.city}, {order.shippingAddress.postalCode},
							{order.shippingAddress.country}
						</p>
						<br />
					</div>

					<div className="order-info-card">
						<h3 className="card-title">Payment</h3>
						<br />
						<p className="card-text">
							<strong>Method:</strong> {order.paymentMethod}
						</p>
						<ul className="summary-lists">
							<li className="summary-item">
								<div className="col">Items</div>
								<div className="col">£{order.itemsPrice.toFixed(2)}</div>
							</li>
							<hr />
							<li className="list-group-item">
								<div className="col">Shipping</div>
								<div className="col">£{order.shippingPrice.toFixed(2)}</div>
							</li>
							<hr />
							<li className="list-group-item">
								<div className="col">Tax</div>
								<div className="col">£{order.taxPrice.toFixed(2)}</div>
							</li>
							<hr />
							<li className="list-group-item">
								<strong>Order Total</strong>

								<strong>£{order.totalPrice.toFixed(2)}</strong>
							</li>
						</ul>
						<br />
					</div>
					<h3 className="order-info-card">
						{order.isDelivered ? (
							<strong style={{ color: "green" }}>Delivered at {order.deliveredAt}</strong>
						) : (
							<strong style={{ color: "red" }}>Not Delivered</strong>
						)}
					</h3>
					<h3 className="order-info-card">
						{order.isPaid ? (
							<>
								<strong style={{ color: "green" }}>Paid at {order.paidAt}</strong>
								<strong>Method:</strong> {order.paymentMethod}
							</>
						) : (
							<strong style={{ color: "red" }}>Not Paid</strong>
						)}
					</h3>
				</div>

				<div className="order-info-card">
					<h3 className="card-title">Items</h3>
					<br />
					<ul className="order-items-list">
						{order.orderItems.map((item: CartItem) => (
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
				</div>
			</div>
		</div>
	);
}
