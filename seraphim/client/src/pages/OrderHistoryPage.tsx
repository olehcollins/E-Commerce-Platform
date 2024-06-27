import { Helmet } from "react-helmet-async";
// import { useNavigate } from "react-router-dom";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { useGetOrderHistoryQuery } from "../hooks/orderHooks";
import { getError } from "../utiles";
import { ApiError } from "../types/ApiError";
import "../stylesheets/OrderHistoryPage.css";

export default function OrderHistoryPage() {
	// const navigate = useNavigate();
	const { data: orders, isLoading, error } = useGetOrderHistoryQuery();

	return (
		<div className="order-h-container">
			<Helmet>
				<title>Order History</title>
			</Helmet>
			<div className="order-history-div">
				<h1>Order History</h1>
				{isLoading ? (
					<LoadingBox></LoadingBox>
				) : error ? (
					<MessageBox variant="danger">{getError(error as unknown as ApiError)}</MessageBox>
				) : (
					<table className="order-table">
						<thead>
							<tr>
								<th>ID</th>
								<th>DATE</th>
								<th>TOTAL</th>
								<th>PAID</th>
								<th>DELIVERED</th>
							</tr>
						</thead>
						<tbody>
							{orders!.map((order) => (
								<tr key={order._id}>
									<td className="order-id">
										<a href={`/order/${order._id}`}>{order._id}</a>
									</td>
									<td>{order.createdAt.substring(0, 10)}</td>
									<td>{order.totalPrice.toFixed(2)}</td>
									<td>{order.isPaid ? order.paidAt.substring(0, 10) : "No"}</td>
									<td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : "No"}</td>
								</tr>
							))}
						</tbody>
					</table>
				)}
			</div>
		</div>
	);
}
