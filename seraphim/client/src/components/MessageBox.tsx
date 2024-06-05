export default function MessageBox({ children }: { variant?: string; children: React.ReactNode }) {
	return (
		<h1 className="error-box">
			<span className="error">
				{children} <i className="bx bxs-error" style={{ color: "red", fontSize: "100px" }}></i>
			</span>
		</h1>
	);
}
