import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import MessageBox from "../components/MessageBox";
import { Store } from "../Store";
import { CartItem } from "../types/CartType";
import "../stylesheets/CartPage.css";

export default function CartPage() {
	const navigate = useNavigate();

	const {
		state: {
			cart: { cartItems },
		},
		dispatch,
	} = useContext(Store);

	const updateCartHandler = (item: CartItem, quantity: number) => {
		if (item.countInStock < quantity) {
			toast.warn("Sorry. Product is out of stock");
			return;
		}
		dispatch({
			type: "CART_ADD_ITEM",
			payload: { ...item, quantity },
		});
	};
	const checkoutHandler = () => {
		navigate("/signin?redirect=/shipping");
	};

	const removeItemHandler = (item: CartItem) => {
		dispatch({ type: "CART_REMOVE_ITEM", payload: item });
	};

	return (
		<div>
			<Helmet>
				<title>Shopping Cart</title>
			</Helmet>
			<h2 className="cart-p-title">Shopping Cart</h2>
			<div className="cart-items-box">
				<div>
					{cartItems.length === 0 ? (
						<MessageBox>
							Cart is empty. <Link to="/">Go Shopping</Link>
						</MessageBox>
					) : (
						<ul className="cart-p-items">
							{cartItems.map((item: CartItem) => (
								<li key={item._id}>
									<div className="cart-p-item">
										<div className="cart-p-item">
											<Link to={`/product/${item._id}`}>
												<img src={item.image} alt={item.name} className="cart-img"></img>{" "}
											</Link>
											<h4> {item.name} </h4>
										</div>
										<div className="quantity-info">
											<div className="btns">
												<button
													className="quantity-btns"
													onClick={() => updateCartHandler(item, item.quantity + 1)}
													disabled={item.quantity === item.countInStock}
												>
													+
												</button>
												<button
													className="quantity-btns"
													onClick={() => updateCartHandler(item, item.quantity - 1)}
													disabled={item.quantity === 1}
												>
													{" "}
													-
												</button>
											</div>
											<div>
												<h4>quantity: {item.quantity}</h4>
												<h4>price: £{item.price.toFixed(2)}</h4>
											</div>
										</div>

										<div>
											<svg
												onClick={() => removeItemHandler(item)}
												className="cart-delete-btn"
												viewBox="0 0 512 512"
												xmlns="http://www.w3.org/2000/svg"
											>
												<g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
												<g
													id="SVGRepo_tracerCarrier"
													strokeLinecap="round"
													strokeLinejoin="round"
												></g>
												<g id="SVGRepo_iconCarrier">
													<rect x="32" y="48" width="448" height="80" rx="32" ry="32"></rect>
													<path d="M74.45,160a8,8,0,0,0-8,8.83L92.76,421.39a1.5,1.5,0,0,0,0,.22A48,48,0,0,0,140.45,464H371.54a48,48,0,0,0,47.67-42.39l0-.21,26.27-252.57a8,8,0,0,0-8-8.83ZM323.31,340.69a16,16,0,1,1-22.63,22.62L256,318.63l-44.69,44.68a16,16,0,0,1-22.63-22.62L233.37,296l-44.69-44.69a16,16,0,0,1,22.63-22.62L256,273.37l44.68-44.68a16,16,0,0,1,22.63,22.62L278.62,296Z"></path>
												</g>
											</svg>
										</div>
									</div>
								</li>
							))}
						</ul>
					)}
				</div>
				<div className="cart-p-st">
					<h3>
						Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)} items) : £
						{cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
					</h3>
					<hr className="hr" />
					<button type="button" onClick={checkoutHandler} disabled={cartItems.length === 0}>
						Proceed to Checkout
					</button>
				</div>
			</div>
		</div>
	);
}
