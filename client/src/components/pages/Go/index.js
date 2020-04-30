import React, { useState, useEffect } from "react";
import Image from "../../partials/Image";
import { Input, Label, FormBtn } from "../../partials/Form";
import API from "../../../utils/api";

export default function Go() {
	const [location, setLocation] = useState({});

	const handleFormSubmit = (event) => {
		console.log("go handleFormSubmit");
		event.preventDefault();
	};

	const handleClick = () => {
		console.log("Go handleClick");
	};

	useEffect(() => {
		console.log("go useEffect");
	}, []);

	return (
		<div className="container">
			<h1>Where do you want to go?</h1>
			<Label value="Enter a zip code:" />
			<Input />
			<FormBtn
				value="Click"
				onClick={() => {
					handleClick();
				}}
			>
				Click
			</FormBtn>
		</div>
	);
}
