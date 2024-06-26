import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { Store } from "../Store";
import CheckoutSteps from "../components/CheckoutSteps";
import "../stylesheets/ShippingPage.css";

export default function ShippingAddressPage() {
	const navigate = useNavigate();
	const { state, dispatch } = useContext(Store);
	const {
		userInfo,
		cart: { shippingAddress },
	} = state;

	useEffect(() => {
		if (!userInfo) {
			navigate("/signin?redirect=/shipping");
		}
	}, [userInfo, navigate]);

	const [fullName, setFullName] = useState(shippingAddress.fullName || "");
	const [address, setAddress] = useState(shippingAddress.address || "");
	const [city, setCity] = useState(shippingAddress.city || "");
	const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || "");
	const [country, setCountry] = useState(shippingAddress.country || "");

	const submitHandler = (e: React.SyntheticEvent) => {
		e.preventDefault();
		dispatch({
			type: "SAVE_SHIPPING_ADDRESS",
			payload: {
				fullName,
				address,
				city,
				postalCode,
				country,
			},
		});
		localStorage.setItem(
			"shippingAddress",
			JSON.stringify({
				fullName,
				address,
				city,
				postalCode,
				country,
			})
		);

		navigate("/payment");
	};
	return (
		<div>
			<Helmet>
				<title>Shipping Address</title>
			</Helmet>
			<div className="form">
				<CheckoutSteps step1={true} step2={true}></CheckoutSteps>
				<form className="signin-f" onSubmit={submitHandler}>
					<h1>Shipping Address</h1>
					<input
						className="input-f"
						required
						onChange={(e) => setFullName(e.target.value)}
						type="text"
						placeholder="Full Name"
					/>
					<input
						className="input-f"
						required
						onChange={(e) => setAddress(e.target.value)}
						type="text"
						placeholder="Address"
					/>
					<input
						className="input-f"
						required
						onChange={(e) => setCity(e.target.value)}
						type="text"
						placeholder="City"
					/>
					<input
						className="input-f"
						required
						onChange={(e) => setPostalCode(e.target.value)}
						type="text"
						placeholder="Postal Code"
					/>
					<input
						className="input-f"
						required
						onChange={(e) => setCountry(e.target.value)}
						type="text"
						placeholder="Country"
					/>
					<div className="mb-3">
						<button className="signin-btn" type="submit">
							Continue
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
