import React from "react";

export default function SearchForm(props) {
	const handleSubmit = () => {
		const query = document.getElementById("searchInput").value;
		props.search(query, props.map);
		document.getElementById("searchInput").value = "";
	};

	const onKeyDown = (e) => {
		if (e.key === "Enter") {
			handleSubmit();
		}
	};

	return (
		<div className="searchContainer">
			<input id="searchInput" onKeyDown={(e) => onKeyDown(e)} />
			<i
				id="searchBtn"
				class="fas fa-search form-control"
				onClick={() => {
					handleSubmit();
				}}
			></i>
		</div>
	);
}
