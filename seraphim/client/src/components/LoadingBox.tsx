import "boxicons";
import "boxicons/css/boxicons.min.css";

export default function LoadingBox() {
	return (
		<h1 className="message-box">
			<span className="message">
				Loading...{" "}
				<i className="bx bxs-color bx-spin" style={{ fontSize: "100px", color: "#4ade80" }}></i>
			</span>
		</h1>
	);
}
