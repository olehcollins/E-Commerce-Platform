// import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import LoadingBox from "../components/LoadingBox";
import {
	useGetOrderDetailsQuery,
	useGetPaypalClientIdQuery,
	usePayOrderMutation,
} from "../hooks/orderHooks.ts";
// import { Store } from "../Store";
import { ApiError } from "../types/ApiError";
import { getError } from "../utiles";
import { CartItem } from "../types/CartType";
import "../stylesheets/PlaceOrderPage.css";
import MessageBox from "../components/MessageBox.tsx";
import { toast } from "react-toastify";
import {
	PayPalButtonsComponentProps,
	SCRIPT_LOADING_STATE,
	DISPATCH_ACTION,
	usePayPalScriptReducer,
	PayPalButtons,
} from "@paypal/react-paypal-js";
import { useEffect } from "react";

export default function OrderPage() {
	// const {
	// 	state: { userInfo },
	// } = useContext(Store);

	const params = useParams();
	const { id: orderId } = params;
	const { data: order, isLoading, error, refetch } = useGetOrderDetailsQuery(orderId!);
	const { mutateAsync: payOrder, isPending: loadingPay } = usePayOrderMutation();

	const testPayHandler = async () => {
		await payOrder({ orderId: orderId! });
		refetch();
		toast.success("Order is paid");
	};

	const [{ isPending, isRejected }, paypalDispatch] = usePayPalScriptReducer();
	const { data: paypalConfig } = useGetPaypalClientIdQuery();

	useEffect(() => {
		if (paypalConfig && paypalConfig.clientId) {
			const loadPaypalScript = async () => {
				paypalDispatch({
					type: DISPATCH_ACTION.RESET_OPTIONS,
					value: {
						clientId: paypalConfig!.clientId,
						currency: "GBP",
					},
				});
				paypalDispatch({
					type: DISPATCH_ACTION.LOADING_STATUS,
					value: SCRIPT_LOADING_STATE.PENDING,
				});
			};
			loadPaypalScript();
		}
	}, [paypalConfig, paypalDispatch]);

	const paypalbuttonTransactionProps: PayPalButtonsComponentProps = {
		style: { layout: "vertical" },
		createOrder(_data, actions) {
			return actions.order
				.create({
					purchase_units: [
						{
							amount: {
								value: "0.3",
								currency_code: "GBP",
							},
						},
					],
					intent: "CAPTURE",
				})
				.then((orderID: string) => {
					return orderID;
				});
		},
		onApprove(_data, actions) {
			return actions.order!.capture().then(async (details) => {
				try {
					await payOrder({ orderId: orderId!, ...details });
					refetch();
					toast.success("Order is paid successfully");
				} catch (err) {
					toast.error(getError(err as ApiError));
				}
			});
		},
		onError: (err) => {
			toast.error(getError(err as ApiError));
		},
	};

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
						<h4 style={{ backgroundColor: "#FDC959", border: "none" }} className="order-info-card">
							{order.isDelivered ? (
								<span style={{ color: "green" }}>Delivered at {order.deliveredAt}</span>
							) : (
								<span style={{ color: "red" }}>Not Delivered</span>
							)}
						</h4>
					</div>

					<div className="order-info-card">
						<h3 className="card-title">Payment</h3>
						<br />
						<p className="card-text">
							<strong>Method:</strong> {order.paymentMethod}
						</p>
						<br />
						<h4 style={{ backgroundColor: "#FDC959", border: "none" }} className="order-info-card">
							{order.isPaid ? (
								<>
									<span style={{ color: "green" }}>Paid at {order.paidAt}</span>
								</>
							) : (
								<span style={{ color: "red" }}>Not Paid</span>
							)}
						</h4>
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
											<span style={{ color: "blue", textDecoration: "underline" }}>
												{item.name}
											</span>
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

				<div className="order-summary-card">
					<h3 className="card-title">Order Summary</h3>
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
						<br />
						{!order.isPaid && (
							<div>
								{isPending ? (
									<LoadingBox />
								) : isRejected ? (
									<MessageBox variant="danger">Error in connecting to PayPal</MessageBox>
								) : (
									<div>
										<PayPalButtons {...paypalbuttonTransactionProps}></PayPalButtons>
										<button className="order-btn" onClick={testPayHandler}>
											Test Pay
										</button>
									</div>
								)}
								{loadingPay && <LoadingBox></LoadingBox>}
							</div>
						)}

						{isPending && <LoadingBox></LoadingBox>}
					</ul>
				</div>
			</div>
		</div>
	);
}
