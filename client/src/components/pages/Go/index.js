import React, { useState, useEffect } from "react";
import Map from "../../partials/Map";
import { Input, Label, FormBtn } from "../../partials/Form";
import API from "../../../utils/api";

export default function Go() {
	const [formObject, setFormObject] = useState();
	const [location, setLocation] = useState();

	const onKeyDown = (e) => {
		if (e.key === "Enter") {
			handleSubmit();
		} else {
			setFormObject(e.target.value);
		}
	};

	const handleClick = () => {
		handleSubmit();
	};

	const handleSubmit = () => {
		API.getLocation(formObject).then((result) => {
			setLocation(result.data.uri);
		});
		document.getElementById("locationInput").value = "";
	};

	return (
		<div className="container">
			<h1>Where do you want to go?</h1>
			<Label value="Enter a zip code:" />
			<Input id="locationInput" onKeyDown={(e) => onKeyDown(e)} />
			<FormBtn
				value="Click"
				onClick={() => {
					handleClick();
				}}
			>
				Click
			</FormBtn>
			{location ? <Map location={location} /> : null}
		</div>
	);
}
