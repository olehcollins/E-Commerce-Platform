import React from "react";
import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useContext, useEffect } from "react";
import { Store } from "./Store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// src/index.js

const App: React.FC = () => {
	const {
		state: { mode, cart, wishlist },
		dispatch,
	} = useContext(Store);

	useEffect(() => {
		document.body.className = `body-${mode}`;
	}, [mode]);

	const switchModeHandler = () => {
		dispatch({ type: "SWITCH_MODE" });
	};

	useEffect(() => {
		if (
			navigator.userAgent.indexOf("Safari") !== -1 &&
			navigator.userAgent.indexOf("Chrome") === -1
		) {
			document.documentElement.style.setProperty("--font-ratio", "0.7");
			document.documentElement.style.setProperty("--size-ratio", "0.98");
			document.documentElement.style.setProperty("--star-ratio", "0.7");
		} else if (navigator.userAgent.indexOf("Chrome") !== -1) {
			document.documentElement.style.setProperty("--ratio", "1");
		}
	}, []);

	return (
		<>
			<ToastContainer position="bottom-center" limit={1} />
			<Header
				themeSwitch={switchModeHandler}
				mode={mode}
				cartItems={
					cart.cartItems.length > 0 ? cart.cartItems.reduce((a, c) => a + c.quantity, 0) : 0
				}
				wishlist={wishlist.length}
			/>
			<div>
				<main>
					<div className="products">
						<Outlet />
					</div>
				</main>
			</div>
			<Footer />
		</>
	);
};

export default App;
