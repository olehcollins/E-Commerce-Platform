import LoadingBox from "../components/LoadingBox";
import Product from "../components/ProductItem";
import { Helmet } from "react-helmet-async";
import { useSearchProductQuery } from "../hooks/productHook";
import MessageBox from "../components/MessageBox";
import { useLocation } from "react-router-dom";

const SearchResults: React.FC = () => {
	const { search } = useLocation();
	const searchTerm = new URLSearchParams(search).get("query") || "";
	const { data: products, isLoading, error } = useSearchProductQuery(searchTerm);
	// const { data: products, isLoading, error } = useGetProductsQuery();

	return isLoading ? (
		<LoadingBox />
	) : error ? (
		<MessageBox children={"Product Not Found"} />
	) : (
		<>
			<Helmet>
				<title>{searchTerm} </title>{" "}
			</Helmet>
			<h2 className="section-title">
				Search Results:{" "}
				<span style={{ color: "blue", textDecoration: "underline" }}>{searchTerm}</span>
			</h2>
			<ul className="products-list">
				{products!.map((product) => (
					<Product
						product={product}
						_id={product._id}
						image={product.image}
						name={product.name}
						category={product.category}
						description={product.description}
						price={product.price}
						countInStock={product.countInStock}
						brand={product.brand}
						reviews={product.reviews}
					/>
				))}
			</ul>
		</>
	);
};

export default SearchResults;
