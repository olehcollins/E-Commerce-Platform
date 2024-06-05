import { ApiError } from "../types/ApiError";
import { getError } from "../utiles";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Product from "../components/ProductItem";
import { Helmet } from "react-helmet-async";
import { useGetProductsQuery } from "../hooks/productHook";
import { Heartsvg } from "../components/Heartsvg";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../stylesheets/extraHome.css";

const Home: React.FC = () => {
	const { data: products, isLoading, error } = useGetProductsQuery();
	const scrollContainerRef = useRef<HTMLUListElement>(null);
	const [scroll, setNewScroll] = useState(false);

	useEffect(() => {
		const scrollContainer = scrollContainerRef.current;
		if (!scrollContainer) return;

		const wheelHandler = (e: WheelEvent) => {
			if (e.deltaY === 0) return;
			e.preventDefault();
			scrollContainer.scrollLeft += e.deltaY * 2;
		};

		scrollContainer.addEventListener("wheel", wheelHandler);

		return () => {
			scrollContainer.removeEventListener("wheel", wheelHandler);
		};
	}, [scroll]);

	const setScroll = () => {
		setNewScroll(!scroll);
	};

	const categories = ["Phones", "Tablets", "Laptops", "Desktops"];

	return isLoading ? (
		<LoadingBox />
	) : error ? (
		<MessageBox>{getError(error as unknown as ApiError)} </MessageBox>
	) : (
		<>
			<Helmet>
				<title>SwiftShop</title>{" "}
			</Helmet>
			<div className="l-img">
				<div className="categories">
					<h2 className="section-title">Shop by Category</h2>
					<ul className="category-list">
						{categories.map((category, index) => (
							<li key={index} className="list-category">
								<Link className="category" to={`/products/${category}`}>
									<h4>{category} </h4>
								</Link>
							</li>
						))}
					</ul>
				</div>
			</div>
			<h2 className="section-title">Latests Products</h2>
			<div className="hot-deals">
				<ul className="hot-deals-list" ref={scrollContainerRef} onMouseEnter={setScroll}>
					{products!.map((product, index) =>
						product.category === "Phones" || product.category === "Tablets" ? (
							<li className="featured-item" key={index}>
								<Heartsvg product={product} />
								<Link className="featured-item" to={`/product/${product._id}`}>
									<img className="featured-img" src={product.image} alt={product.name} />
									<h4>
										<div>
											<h4>{product.name}</h4>
										</div>
										<h4 className="fs-price">£{product.price.toFixed(2)} </h4>
									</h4>
								</Link>
							</li>
						) : (
							""
						)
					)}
				</ul>
			</div>
			<h2 className="section-title">Featured</h2>
			<ul className="products-list">
				{products!
					.filter((product) => product.category === "Phones")
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
			<ul className="products-list" id="laptops-list">
				{products!
					.filter((product) => product.category === "Laptops")
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
			<ul className="products-list">
				{products!
					.filter((product) => product.category === "Tablets")
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
			<ul className=" products-list" id="laptops-list">
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

			<div className="deal">
				<div className="deal-code-info">
					<div className="deal-info">
						<h2>Hurry! 15% off ends midnight</h2>
						<p>
							Selected seller deals are still wating-but not for long |{" "}
							<small>Ends 31 June. Min spend £19.99. Max disc £75. T&Cs.</small>
						</p>
					</div>
					<Link to={"/products/Phones"} className="deal-code">
						Use code MAYPAY15
					</Link>
				</div>
				<div className="deal-item">
					<h2>Transform your space in 3, 2, 1</h2>
					<h4>Discover the joy of DIY with trending ideas for your home.</h4>
					<Link to={"/products/Desktops"}>Find out More</Link>
				</div>
			</div>
			<hr />
		</>
	);
};

export default Home;
