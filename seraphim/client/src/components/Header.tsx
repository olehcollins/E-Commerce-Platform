import { useContext, useEffect, useState } from "react";
import LogoHome from "./LogoHome";
import { Link } from "react-router-dom";
import { Store } from "../Store";
import { useSignoutMutation } from "../hooks/userHooks";
import { toast } from "react-toastify";
import { getError } from "../utiles";
import { ApiError } from "../types/ApiError";
import { Cloudinary, CloudinaryImage } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
import { auto } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";
import { SearchBox } from "./SearchBox";

interface Props {
	themeSwitch: () => void;
	mode: string;
	cartItems: number;
	wishlist: number;
}

const Header: React.FC<Props> = ({ themeSwitch, mode, cartItems, wishlist }) => {
	const {
		state: { userInfo },
		dispatch,
	} = useContext(Store);

	const signoutHandler = () => {
		dispatch({ type: "USER_SIGNOUT" });
		localStorage.removeItem("userInfo");
		localStorage.removeItem("cartItems");
		localStorage.removeItem("shippingAddress");
		localStorage.removeItem("paymentMethod");
		window.location.href = "/";
	};
	const { mutateAsync: signout } = useSignoutMutation();

	const submitHandler = async (e: React.SyntheticEvent) => {
		e.preventDefault();
		try {
			if (!userInfo || !userInfo.email) {
				signoutHandler();
				return;
			}
			await signout(userInfo.email);
			signoutHandler();
		} catch (err) {
			toast.error(getError(err as ApiError));
		}
	};

	const signinHandler = () => {};

	const cld = new Cloudinary({
		cloud: {
			cloudName: "dj6cbc50o",
		},
	});

	const [image, setImage] = useState<CloudinaryImage | string>("");
	useEffect(() => {
		if (!userInfo) return;

		const userImage = userInfo?.profileImage;
		const img =
			userImage &&
			cld
				.image(userImage)
				.format("auto")
				.quality("auto")
				.resize(auto().gravity(autoGravity()).width(40).height(40));

		setImage(
			img ||
				"https://images.unsplash.com/photo-1636622433525-127afdf3662d?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
		);
		// console.log(userInfo.profileImage);
	}, [userInfo]);

	return (
		<header>
			<nav className="navbar">
				<Link to="/" className="home-link">
					<LogoHome />
					<strong>SwiftShop</strong>
				</Link>

				<div className="nav-links">
					<SearchBox />
					<Link
						onClick={userInfo ? submitHandler : signinHandler}
						to={!userInfo ? "/signin" : ""}
						className="nav-link"
					>
						{userInfo ? "Sign out" : "Sign in"}
					</Link>
					<Link className="cart" to="/cart">
						<svg className="basket" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
							<g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
							<g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
							<g id="SVGRepo_iconCarrier">
								<path d="M1015.66 284a31.82 31.82 0 0 0-25.998-13.502H310.526l-51.408-177.28c-20.16-69.808-68.065-77.344-87.713-77.344H34.333c-17.569 0-31.777 14.224-31.777 31.776S16.78 79.425 34.332 79.425h137.056c4.336 0 17.568 0 26.593 31.184l176.848 649.936c3.84 13.712 16.336 23.183 30.591 23.183h431.968c13.409 0 25.376-8.4 29.905-21.024l152.256-449.68c3.504-9.744 2.048-20.592-3.888-29.024zM815.026 720.194H429.539L328.387 334.066h616.096zM752.003 848.13c-44.192 0-80 35.808-80 80s35.808 80 80 80 80-35.808 80-80-35.808-80-80-80zm-288 0c-44.192 0-80 35.808-80 80s35.808 80 80 80 80-35.808 80-80-35.808-80-80-80z"></path>
							</g>
						</svg>
						<h4 style={{ marginLeft: "0.5rem" }}>{cartItems > 0 ? cartItems : ""}</h4>
					</Link>
					<Link to={"/wishlist"}>
						<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="heart-svg">
							<g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
							<g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
							<g id="SVGRepo_iconCarrier">
								{" "}
								<path
									d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z"
									strokeWidth="1.8"
									strokeLinecap="round"
									strokeLinejoin="round"
								></path>{" "}
							</g>
							<text
								className="wishlist-count"
								x="50%"
								y="50%"
								dominantBaseline="middle"
								textAnchor="middle"
							>
								{wishlist > 0 ? wishlist : ""}
							</text>
						</svg>
					</Link>
					{userInfo && typeof image !== "string" && (
						<div className="profile-img">
							<AdvancedImage cldImg={image} />

							<div className="dropdown-content">
								<a href="/orders">Order History</a>
								<a href="customer/update">Edit Profile</a>
							</div>
						</div>
					)}
					<button
						aria-label="theme-toggle btn"
						id="theme-toggle"
						className="theme-switch"
						onClick={themeSwitch}
					>
						{mode === "light" ? (
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
								<path d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59ZM21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75ZM17.834 18.894a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1 0-1.061 1.06l1.59 1.591ZM12 18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-2.25A.75.75 0 0 1 12 18ZM7.758 17.303a.75.75 0 0 0-1.061-1.06l-1.591 1.59a.75.75 0 0 0 1.06 1.061l1.591-1.59ZM6 12a.75.75 0 0 1-.75.75H3a.75.75 0 0 1 0-1.5h2.25A.75.75 0 0 1 6 12ZM6.697 7.757a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 0 0-1.061 1.06l1.59 1.591Z" />
							</svg>
						) : (
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
								<g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
								<g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
								<g id="SVGRepo_iconCarrier">
									<path d="M21.5287 15.9294C21.3687 15.6594 20.9187 15.2394 19.7987 15.4394C19.1787 15.5494 18.5487 15.5994 17.9187 15.5694C15.5887 15.4694 13.4787 14.3994 12.0087 12.7494C10.7087 11.2994 9.90873 9.40938 9.89873 7.36938C9.89873 6.22938 10.1187 5.12938 10.5687 4.08938C11.0087 3.07938 10.6987 2.54938 10.4787 2.32938C10.2487 2.09938 9.70873 1.77938 8.64873 2.21938C4.55873 3.93938 2.02873 8.03938 2.32873 12.4294C2.62873 16.5594 5.52873 20.0894 9.36873 21.4194C10.2887 21.7394 11.2587 21.9294 12.2587 21.9694C12.4187 21.9794 12.5787 21.9894 12.7387 21.9894C16.0887 21.9894 19.2287 20.4094 21.2087 17.7194C21.8787 16.7894 21.6987 16.1994 21.5287 15.9294Z"></path>{" "}
								</g>
							</svg>
						)}
					</button>
				</div>
			</nav>
		</header>
	);
};

export default Header;
