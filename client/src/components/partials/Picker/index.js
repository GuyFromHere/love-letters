import React, {useState} from "react";
//import "./style.css";

export default function Picker(props) {

	return (
		<dialog id={props.id} className="pickerContainer">
			<i class="far fa-keyboard" id="text" onClick={(e) => {props.choose(e)}}></i>
			<i class="fas fa-camera" id="capture" onClick={(e) => {props.choose(e)}}></i>
		</dialog>
	);
}
