import React, { useState, ChangeEvent, FormEvent } from "react";
import ProductRating from "./ProductRating";
import { ProductType } from "../types/Products";
import { useMutation } from "@tanstack/react-query";
import apiClient from "../apiClient";
import { toast } from "react-toastify";

interface FormProps {
	Rating: number;
	setRating: (Rating: number) => void;
	product?: ProductType;
}

const ReviewForm: React.FC<FormProps> = ({ Rating, setRating, product }: FormProps) => {
	const [Text, setText] = useState("");
	const [sValue, setSValue] = useState(0);
	const [formText, setFormText] = useState("");

	const handleTextInput = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setText(e.target.value);
		setFormText(e.target.value);
	};

	const setData = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const data = { customer: "collins", caption: Text, stars: sValue };
		product?.reviews.push(data);
		toast.success("Item reviewed", {
			autoClose: 2000,
			style: {
				color: "green",
			},
		});
	};

	const updateProduct = useMutation({
		mutationFn: async (product: ProductType) => {
			await apiClient.put<ProductType>(`/products/${product._id}`, product);
		},
	});

	return (
		<div className="container">
			<form
				onSubmit={(e) => {
					setData(e as FormEvent<HTMLFormElement>);
					updateProduct.mutate(product as ProductType);
					setFormText("");
				}}
			>
				<label htmlFor="userReview">Review:</label>
				<textarea
					id="userReview"
					name="userReview"
					value={formText}
					onChange={handleTextInput}
					required
				/>
				<div className="star-submit">
					<ProductRating Rating={Rating} setRating={setRating} setSValue={setSValue} />

					<button type="submit">Submit</button>
				</div>
			</form>
		</div>
	);
};

export default ReviewForm;
