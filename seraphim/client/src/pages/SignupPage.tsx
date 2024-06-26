import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingBox from "../components/LoadingBox";
import { useSignupMutation } from "../hooks/userHooks";
import { Store } from "../Store";
import { ApiError } from "../types/ApiError";
import { getError } from "../utiles";
import "../stylesheets/SigninPage.css";
import axios from "axios";

const Signup = () => {
	const navigate = useNavigate();
	const { search } = useLocation();
	const redirectInUrl = new URLSearchParams(search).get("redirect");
	const redirect = redirectInUrl ? redirectInUrl : "/";

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [image, setImage] = useState<File | null>();
	const [loading, setLoading] = useState<boolean>(false);

	const { state, dispatch } = useContext(Store);
	const { userInfo } = state;

	const { mutateAsync: signup, isPending } = useSignupMutation();

	const submitHandler = async (e: React.SyntheticEvent) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			toast.error("Passwords do not match");
			return;
		}

		try {
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

			const data = await signup({
				name,
				email,
				password,
				profileImage,
			});
			dispatch({ type: "USER_SIGNIN", payload: data });
			localStorage.setItem("userInfo", JSON.stringify(data));
			// return;
			navigate(redirect);
		} catch (err) {
			toast.error(getError(err as ApiError));
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (userInfo) {
			navigate(redirect);
		}
	}, [navigate, redirect, userInfo]);

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
				<h1>Sign up</h1>
				<input
					className="input-f"
					required
					onChange={(e) => setName(e.target.value)}
					type="text"
					placeholder="Name"
				/>
				<input
					className="input-f"
					required
					onChange={(e) => setEmail(e.target.value)}
					type="text"
					placeholder="Email"
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
				<div className="mb-3">
					<button className="signin-btn" disabled={isPending} type="submit">
						Submit
					</button>
				</div>
				<div>
					<input type="file" name="file" onChange={handleChange} />
					{loading && <h4>Loading...</h4>}
				</div>
				<div className="create-acc">
					Already have an account? <Link to={`/signin?redirect=${redirect}`}>Sign in</Link>
				</div>
			</form>
			{isPending && <LoadingBox />}
		</div>
	);
};

export default Signup;
