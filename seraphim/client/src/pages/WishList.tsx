import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import MessageBox from "../components/MessageBox";
import { Store } from "../Store";
import "../stylesheets/WishListPage.css";
import { ProductType } from "../types/Products";

export default function WishListPage() {
	const {
		state: { wishlist },
		dispatch,
	} = useContext(Store);

	const removeItemHandler = (item: ProductType) => {
		dispatch({ type: "WISHLIST_REMOVE_ITEM", payload: item });
	};

	return (
		<div>
			<Helmet>
				<title>Wish List</title>
			</Helmet>
			<h2 className="cart-p-title">Wish List</h2>
			<div className="cart-items-box">
				<div>
					{wishlist.length === 0 ? (
						<MessageBox>
							Empty Wishlist. <Link to="/">Go Shopping</Link>
						</MessageBox>
					) : (
						<ul className="wish-items">
							{wishlist.map((item: ProductType) => (
								<li className="whish-l-item" key={item._id}>
									<Link className="item-link" to={`/product/${item._id}`}>
										<img src={item.image} alt={item.name} className="wishlist-img"></img>{" "}
									</Link>

									<div className="w-info">
										<div className="w-item-info">
											<h4> {item.name} </h4>
											<h4>price: £{item.price.toFixed(2)}</h4>
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
			</div>
		</div>
	);
}
