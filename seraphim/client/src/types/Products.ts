export type ProductType = {
	_id: string;
	name: string;
	image: string;
	category: string;
	brand: string;
	price: number;
	countInStock: number;
	description: string;
	reviews: { customer: string; caption: string; stars: number }[];
	avgRating?: number;
};
