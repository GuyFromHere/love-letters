import React, { useState } from "react";
import "./style.css";

export default function Modal(props) {
	const [letterType, setLetterType] = useState("");

	const handleClick = () => {
		const text = document.getElementById("letterText").value;
		props.send(props.location.lat, props.location.lng, text, props.map);
		props.closeLeaveModal();
	};

	const chooseLetterType = (e) => {
		setLetterType(e.target.id);
	};

	return (
		<dialog id={props.id} className="modalContainer">
			<div className="iconContainer">
				<i
					class="far fa-keyboard fa-5x"
					id="text"
					onClick={(e) => {
						chooseLetterType(e);
					}}
				></i>
				<i
					class="fas fa-camera fa-5x"
					id="capture"
					onClick={(e) => {
						chooseLetterType(e);
					}}
				></i>
			</div>
			{letterType === "capture" ? (
				<div className="modalCard">
					<div className="modalHeader">
						<h2>Capture Component Here</h2>
					</div>
					<div className="modalFooter">
						<button className="btnCancel" onClick={props.closeLeaveModal}>
							CLOSE
						</button>
						<button className="btnSubmit">SEND</button>
					</div>
				</div>
			) : null}
			{letterType === "text" ? (
				<div className="modalCard">
					<div className="modalBody">
						<textarea
							id="letterText"
							placeholder="Say something lovely!"
							rows="10"
						></textarea>
					</div>
					<div className="modalFooter">
						<button className="btnCancel" onClick={props.closeLeaveModal}>
							CLOSE
						</button>
						<button className="btnSubmit" onClick={handleClick}>
							SEND
						</button>
					</div>
				</div>
			) : null}
		</dialog>
	);
}
