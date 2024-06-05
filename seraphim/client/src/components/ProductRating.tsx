import { MouseEventHandler, useState } from "react";

interface RatingProps {
	Rating: number;
	setRating: (newRating: number) => void;
	setSValue: (sVaule: number) => void;
}

const ProductRating: React.FC<RatingProps> = ({ Rating, setRating, setSValue }: RatingProps) => {
	const [hover, setHover] = useState<number>(0);

	const handleClick: MouseEventHandler<HTMLInputElement> = (e) => {
		const target = e.target as HTMLInputElement;
		setRating(parseInt(target.value));
		setSValue(parseInt(target.value));
	};

	return (
		<div className="star-rating">
			{[...Array(5)].map((_star, index) => {
				const ratingValue = index + 1;

				return (
					<label key={index}>
						<input
							className="star-label"
							type="radio"
							name="rating"
							value={ratingValue}
							onClick={handleClick}
						/>
						<svg
							className="star-review"
							fill={ratingValue <= (hover || Rating) ? "#ffc107" : "#d1d5db"}
							viewBox="0 0 24 24"
							onMouseEnter={() => setHover(ratingValue)}
							onMouseLeave={() => setHover(0)}
							onClick={() => setRating(ratingValue)}
						>
							<path d="M21.947 9.179a1.001 1.001 0 0 0-.868-.676l-5.701-.453-2.467-5.461a.998.998 0 0 0-1.822-.001L8.622 8.05l-5.701.453a1 1 0 0 0-.619 1.713l4.213 4.107-1.49 6.452a1 1 0 0 0 1.53 1.057L12 18.202l5.445 3.63a1.001 1.001 0 0 0 1.517-1.106l-1.829-6.4 4.536-4.082c.297-.268.406-.686.278-1.065z"></path>
						</svg>
					</label>
				);
			})}
		</div>
	);
};

export default ProductRating;
