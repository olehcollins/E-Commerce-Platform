import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { Store } from "../Store";
import "../stylesheets/PaymentPage.css";
import CheckoutSteps from "../components/CheckoutSteps";

export default function PaymentMethodPage() {
	const navigate = useNavigate();
	const { state, dispatch } = useContext(Store);
	const {
		cart: { shippingAddress, paymentMethod },
	} = state;

	const [paymentMethodName, setPaymentMethodName] = useState(paymentMethod || "PayPal");
	useEffect(() => {
		if (!shippingAddress.address) {
			navigate("/shipping");
		}
	}, [shippingAddress, navigate]);

	const submitHandler = (e: React.SyntheticEvent) => {
		e.preventDefault();
		dispatch({ type: "SAVE_PAYMENT_METHOD", payload: paymentMethodName });
		localStorage.setItem("paymentMethod", paymentMethodName);
		navigate("/placeorder");
	};

	return (
		<div>
			<Helmet>
				<title>Payment Method</title>
			</Helmet>
			<div className="form">
				<CheckoutSteps step1={true} step2={true} step3={true}></CheckoutSteps>
				<form className="signin-f payment-f" onSubmit={submitHandler}>
					<h1>Payment Method</h1>
					<div className="p-choice">
						<label htmlFor="PayPal">PayPal</label>
						<input
							className="input-f"
							id="PayPal"
							value="PayPal"
							onChange={(e) => setPaymentMethodName(e.target.value)}
							type="radio"
							checked={paymentMethodName === "PayPal"}
						/>
						<label htmlFor="Stripe">Stripe</label>
						<input
							className="input-f"
							id="Stripe"
							value="Stripe"
							onChange={(e) => setPaymentMethodName(e.target.value)}
							type="radio"
							checked={paymentMethodName === "Stripe"}
						/>
					</div>

					<div>
						<button className="signin-btn" type="submit">
							Continue
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
