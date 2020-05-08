import React, {useState} from "react";
import "./style.css";

export default function Modal(props) {
	
	console.log('modal')
	console.log(props)

	const handleClick = () => {
		console.log('modal handleClick')
		const text = document.getElementById("letterText").value;
		props.send(props.location.lat, props.location.lng, text, props.map);
	};

	const renderText = () => {
		return (
			<div>
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
			</div>
		)
	}

	const renderCapture = () => {
		console.log('Modal renderCapture')
		return (
			<div>
				<div className="modalHeader">
					<h2>Capture Component Here</h2>
				</div>
				<div className="modalFooter">
					<button className="btnCancel">
						CLOSE
					</button>
					<button className="btnSubmit">
						SEND
					</button>
				</div>
			</div>
		)
	}

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
