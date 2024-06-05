import { Stars } from "./Stars";

interface ReviewProps {
	reviews: { customer: string; caption: string; stars: number }[];
}

const Reviews = ({ reviews }: ReviewProps) => {
	return (
		<ul>
			{reviews.map((review, index) => {
				return (
					<li className="review-li" key={index}>
						<div className="customer">
							<h3>
								<img className="customer-photo" src="../../public/images/mozart.jpg" alt="mozart" />{" "}
								{review.customer}
							</h3>
							<Stars stars={review.stars} />
						</div>
						<div>
							<span>{review.caption} </span>
						</div>
					</li>
				);
			})}
		</ul>
	);
};

export default Reviews;
