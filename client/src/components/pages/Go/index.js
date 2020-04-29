import React, {useState, useEffect} from "react";
import Image from '../../partials/Image';
import { Input, TextArea, FormBtn } from '../../partials/Form';
import API from '../../../utils/api';

/* 
TODO:
- set unique user / capture key
- get image capture 
- store reference to capture in DB   
- upload capture to AWS using key for name
- call loadImage and get key from database
- BUT WAIT...will this work or does the key have to be unique every time?

*/

export default function Go() {
	const [image, setImage] = useState({url: "1_image.png"});
	const [captureKey, setCaptureKey] = useState();
	const urlRoot = "https://love-letters-gfh.s3-us-west-2.amazonaws.com/publicprefix/";

	function handleFormSubmit(event) {
		event.preventDefault();
		API.saveImageTest({
			url: "1_image.png"
		})
			/* .then(res => loadImage())
			.catch(err => console.log(err)); */
	}

	function loadImage() {
		API.getImage().then(res => {
			setImage({url: res.data});
		})

	}

	useEffect(() => {
		//loadImage();
	}, [])

	return (
		<div className="container">
			<h1>This is the Go page.</h1>
			<h1>{image.url}</h1>
			<Image src={urlRoot + image.url}/>
			<Input />
			<FormBtn />
		</div>
	);
}
