import React, { useState } from "react";
import ModalCard from "../ModalCard";
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
					class="far fa-keyboard fa-3x"
					id="text"
					onClick={(e) => {
						chooseLetterType(e);
					}}
				></i>
				<i
					class="fas fa-camera fa-3x"
					id="capture"
					onClick={(e) => {
						chooseLetterType(e);
					}}
				></i>
			</div>
			{letterType ? (
				<div className="modalCardContent" style={{ display: "block" }}>
					<ModalCard
						letterType={letterType}
						handleClick={handleClick}
						closeLeaveModal={props.closeLeaveModal}
					/>
				</div>
			) : (
				<div className="closeModalContainer">
					<i class="far fa-times-circle fa-2x" onClick={props.closeLeaveModal}></i>
				</div>
			)}
		</dialog>
	);
}
