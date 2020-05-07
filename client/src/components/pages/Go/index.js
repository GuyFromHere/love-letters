import React, { useState } from "react";
import Map from "../../partials/Map";
import { Input, FormBtn } from "../../partials/Form";
import API from "../../../utils/api";

export default function Go() {
	const [location, setLocation] = useState();

	const onKeyDown = (e) => {
		if (e.key === "Enter") {
			handleSubmit();
		}
	};

	const handleSubmit = () => {
		API.getLocation(document.getElementById("locationInput").value).then((result) => {
			setLocation(result.data.uri);
		});
		document.getElementById("locationInput").value = "";
	};

	return (
		<div className="container">
			<h1>Where do you want to go?</h1>
			<Input id="locationInput" onKeyDown={(e) => onKeyDown(e)} />
			<FormBtn
				value="Click"
				onClick={() => {
					handleSubmit();
				}}
			>
				Click
			</FormBtn>
			{location ? <Map location={location} /> : null}
		</div>
	);
}
