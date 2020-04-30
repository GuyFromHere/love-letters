import React, { useState, useEffect } from "react";
import Image from "../../partials/Image";
import { Input, TextArea, FormBtn } from "../../partials/Form";
import API from "../../../utils/api";

/* 
TODO:
- set unique user / capture key
- get image capture 
- store reference to capture in DB   
- upload capture to AWS using key for name
- call loadImage and get key from database
- BUT WAIT...will this work or does the key have to be unique every time?

*/

const getUniqueKey = () => {
	const keyOffset = new Date();
	console.log("getUniqueKey");
	const rand = Math.floor(Math.random() * keyOffset);
	return rand;
};

export default function Go() {
	const [image, setImage] = useState({ url: "1_image.png" });
	const [captureKey, setCaptureKey] = useState(getUniqueKey());
	const urlRoot = "https://love-letters-gfh.s3-us-west-2.amazonaws.com/publicprefix/";

	const handleFormSubmit = (event) => {
		event.preventDefault();
		API.saveImageTest({
			url: captureKey,
		});
		/* .then(res => loadImage())
			.catch(err => console.log(err)); */
	};

	const handleClick = () => {
		console.log("handleClick");
		setCaptureKey(getUniqueKey());
		console.log(captureKey);
	};

	const loadImage = () => {
		API.getImage().then((res) => {
			setImage({ url: res.data });
		});
	};

	useEffect(() => {
		//loadImage();
		console.log("useEffect");
	}, []);

	return (
		<div className="container">
			<h1>This is the Go page.</h1>
			<h1>{captureKey}</h1>
			<Image src={urlRoot + image.url} />
			<Input />
			<FormBtn
				value="Click"
				onClick={() => {
					handleClick();
				}}
			>
				Click{" "}
			</FormBtn>
		</div>
	);
}
