import React, { useState } from "react";
import "../stylesheets/SearchBox.css";
import { useNavigate } from "react-router-dom";

export const SearchBox = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const navigate = useNavigate();

	const handleChange = (e) => {
		setSearchTerm(e.target.value);
	};

	const handleSubmit = (e: React.SyntheticEvent) => {
		e.preventDefault();
		navigate(`products/search?query=${encodeURIComponent(searchTerm)}`);
	};

	return (
		<form className="navbar-search" onSubmit={handleSubmit}>
			<input type="text" placeholder="Search..." value={searchTerm} onChange={handleChange} />
			<button type="submit">Search</button>
		</form>
	);
};
