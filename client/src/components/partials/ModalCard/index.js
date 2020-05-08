import React, { useState } from "react";

export default function ModalCard(props) {
	const textCard = (
		<div className="modalCard">
			<div className="modalBody">
				<textarea id="letterText" placeholder="Say something lovely!" rows="10"></textarea>
			</div>
			<div className="modalFooter">
				<button className="btnSubmit" onClick={props.handleClick}>
					SEND
				</button>
				<div className="closeModalContainer">
					<i class="far fa-times-circle fa-2x" onClick={props.closeLeaveModal}></i>
				</div>
			</div>
		</div>
	);

	const captureCard = (
		<div className="modalCard">
			<div className="modalHeader">
				<h2>Capture Component Here</h2>
			</div>
			<div className="modalFooter">
				<button className="btnSubmit">SEND</button>
			</div>
			<div className="closeModalContainer">
				<i class="far fa-times-circle fa-2x" onClick={props.closeLeaveModal}></i>
			</div>
		</div>
	);

	return <div>{props.letterType === "text" ? textCard : captureCard}</div>;
}
