import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingBox from "../components/LoadingBox";
import { useSigninMutation } from "../hooks/userHooks";
import { Store } from "../Store";
import { ApiError } from "../types/ApiError";
import { getError } from "../utiles";
import "../stylesheets/SigninPage.css";

const SigninPage = () => {
	const navigate = useNavigate();
	const { search } = useLocation();
	const redirectInUrl = new URLSearchParams(search).get("redirect");
	const redirect = redirectInUrl ? redirectInUrl : "/";

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const { state, dispatch } = useContext(Store);
	const { userInfo } = state;

	const { mutateAsync: signin, isPending } = useSigninMutation();

	const submitHandler = async (e: React.SyntheticEvent) => {
		e.preventDefault();
		try {
			const data = await signin({
				email,
				password,
			});
			dispatch({ type: "USER_SIGNIN", payload: data });
			localStorage.setItem("userInfo", JSON.stringify(data));
			navigate(redirect);
		} catch (err) {
			toast.error(getError(err as ApiError));
		}
	};

	useEffect(() => {
		if (userInfo) {
			navigate(redirect);
		}
	}, [navigate, redirect, userInfo]);

	return (
		<div className="form">
			<Helmet>
				<title>Sign in</title>
			</Helmet>
			<form className="signin-f" onSubmit={submitHandler}>
				<h1>Sign in</h1>
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
				<div className="mb-3">
					<button className="signin-btn" disabled={isPending} type="submit">
						Sign In
					</button>
				</div>
				<div className="create-acc">
					New customer? <Link to={`/signup?redirect=${redirect}`}>Create your account</Link>
				</div>
			</form>
			{isPending && <LoadingBox />}
		</div>
	);
};

export default SigninPage;
