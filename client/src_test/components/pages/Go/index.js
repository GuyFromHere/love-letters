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
	const src1 = "248022867949_image.png";
	const src2 = "_image.png ";
	const [image, setImage] = useState({ src: 0 });
	const [captureKey, setCaptureKey] = useState(getUniqueKey());
	//const urlRoot = "https://love-letters-gfh.s3-us-west-2.amazonaws.com/publicprefix/";
	const urlRoot = "./images/";

	const handleClick = () => {
		console.log("handleClick");
	};

	const loadImage = () => {
		//
		console.log("loadImage");
	};

	useEffect(() => {
		//loadImage();
		console.log("useEffect");
	}, []);

	return (
		<div className="container">
			<h1>This is the Go page.</h1>
			<h1>{urlRoot + image.src + "_image.png"}</h1>
			<Image src={urlRoot + image.src + "_image.png"} />
			<FormBtn
				onClick={() => {
					handleClick();
				}}
			>
				Change
			</FormBtn>
		</div>
	);
}
