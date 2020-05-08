import React from "react";
import "./style.css";

export default function Modal(props) {
	const handleClick = () => {
		const text = document.getElementById("letterText").value;
		props.send(props.location.lat, props.location.lng, text, props.map);
	};

	return (
		<dialog id={props.id} className="modalContainer">
			<div className="modalHeader">
				<h2>Type your message:</h2>
			</div>
			<div className="modalBody">
				<textarea id="letterText"></textarea>
			</div>
			<div className="modalFooter">
				<button className="btnCancel" onClick={props.close}>
					CLOSE
				</button>
				<button className="btnSubmit" onClick={handleClick}>
					SEND
				</button>
			</div>
		</dialog>
	);
}
