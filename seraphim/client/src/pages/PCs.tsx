import LoadingBox from "../components/LoadingBox";
import Product from "../components/ProductItem";
import { Helmet } from "react-helmet-async";
import { useGetProductsQuery } from "../hooks/productHook";
import MessageBox from "../components/MessageBox";
import "../stylesheets/extraHome.css";

const Desktops: React.FC = () => {
	const { data: products, isLoading, error } = useGetProductsQuery();

	return isLoading ? (
		<LoadingBox />
	) : error ? (
		<MessageBox children={error.message} />
	) : (
		<>
			<Helmet>
				<title>Desktops</title>{" "}
			</Helmet>
			<h2 className="section-title">Desktops</h2>
			<ul className="products-list" id="laptops-list">
				{products!
					.filter((product) => product.category === "Desktops")
					.map((product) => (
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

export default Desktops;
