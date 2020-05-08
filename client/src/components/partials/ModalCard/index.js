import React, { useState } from "react";
import Capture from "../Capture";
import "./style.css";

export default function ModalCard(props) {
	const textCard = (
		<div className="modalCard">
			<div className="modalBody">
				<textarea id="letterText" placeholder="Say something lovely!" rows="10"></textarea>
			</div>
			<div className="modalFooter">
				<div className="closeModalContainer">
					<i class="far fa-times-circle fa-2x" onClick={props.closeLeaveModal}></i>
					<i class="far fa-paper-plane fa-2x" onClick={props.handleClick}></i>
				</div>
			</div>
		</div>
	);

	const captureCard = (
		<div className="modalCard">
			<div className="modalBody">
				<Capture
					location={props.location}
					closeLeaveModal={props.closeLeaveModal}
					map={props.map}
					drawMarker={props.drawMarker}
				/>
			</div>
			<div className="closeModalContainer">
				<i class="far fa-times-circle fa-2x" onClick={props.closeLeaveModal}></i>
			</div>
		</div>
	);

	return <div>{props.letterType === "text" ? textCard : captureCard}</div>;
}
