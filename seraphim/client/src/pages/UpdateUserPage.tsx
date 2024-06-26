import { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingBox from "../components/LoadingBox";
import { useUpdateMutation, useDeleteMutation } from "../hooks/userHooks";
import { Store } from "../Store";
import { ApiError } from "../types/ApiError";
import { getError } from "../utiles";
import "../stylesheets/SigninPage.css";
import axios from "axios";

const UpdateUser = () => {
	const navigate = useNavigate();

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [image, setImage] = useState<File | null>();
	const [loading, setLoading] = useState<boolean>(false);

	const { state, dispatch } = useContext(Store);

	const { mutateAsync: update, isPending } = useUpdateMutation();
	const { mutateAsync: deleteAccount } = useDeleteMutation();
	const { userInfo } = state;
	const refreshToken = userInfo!.refreshToken;
	const id = userInfo!.id;

	const handleDelete = async () => {
		if (!refreshToken) {
			console.error("Refresh token is required");
			return;
		}
		try {
			const data = await deleteAccount({
				id,
				refreshToken,
			});
			if (data) {
				dispatch({ type: "USER_SIGNOUT" });
				localStorage.removeItem("userInfo");
				localStorage.removeItem("cartItems");
				localStorage.removeItem("shippingAddress");
				localStorage.removeItem("paymentMethod");
				window.location.href = "/";
			}
		} catch (error) {
			console.error("Error deleting account:", error);
		}
	};

	const submitHandler = async (e: React.SyntheticEvent) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			toast.error("Passwords do not match");
			return;
		}
		try {
			if (!refreshToken) {
				toast.success("Invalid user information: refreshToken is undefined");
				return;
			}
			const imageData = new FormData();
			let profileImage;
			if (image) {
				imageData.append("file", image);
				imageData.append("upload_preset", "wtspdwa4");
				setLoading(true);
				const res = await axios.post(
					"https://api.cloudinary.com/v1_1/dj6cbc50o/image/upload",
					imageData
				);
				const file = res.data;

				profileImage = file.public_id;
			} else {
				profileImage = "";
			}
			const data = await update({
				id,
				name,
				email,
				password,
				refreshToken,
				profileImage,
			});

			dispatch({ type: "USER_SIGNIN", payload: data });
			localStorage.setItem("userInfo", JSON.stringify(data));
			toast.success("profile updated");
			console.log(data);
			if (data) navigate("/");
		} catch (err) {
			toast.error(getError(err as ApiError));
		}
	};
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (files && files[0]) {
			setImage(files[0]);
		}
	};

	return (
		<div className="form">
			<Helmet>
				<title>Sign up</title>
			</Helmet>
			<form className="signin-f" onSubmit={submitHandler}>
				<input
					className="input-f"
					required
					onChange={(e) => setName(e.target.value)}
					type="text"
					placeholder={userInfo?.name}
				/>
				<input
					className="input-f"
					required
					onChange={(e) => setEmail(e.target.value)}
					type="text"
					placeholder={userInfo?.email}
				/>
				<input
					className="input-f"
					required
					onChange={(e) => setPassword(e.target.value)}
					type="password"
					placeholder="Password"
				/>
				<input
					className="input-f"
					required
					onChange={(e) => setConfirmPassword(e.target.value)}
					type="password"
					placeholder="Confirm Password"
				/>
				<div>
					<input type="file" name="file" onChange={handleChange} />
					{loading && <h4>Loading...</h4>}
				</div>
				<div className="mb-3">
					<button className="signin-btn" type="submit">
						Submit
					</button>
				</div>
			</form>
			<strong className="d-account" onClick={handleDelete}>
				Delete Account
			</strong>
			{isPending && <LoadingBox />}
		</div>
	);
};

export default UpdateUser;
