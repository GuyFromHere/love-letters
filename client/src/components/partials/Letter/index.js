import React, { useState } from "react";

export default function Letter(props) {
	return (
		<dialog id={props.id} className="letterContainer">
			{props.type === "letter" ? <p>{props.text}</p> : <img src={props.src}></img>}

			<div className="closeModalContainer">
				<i class="far fa-times-circle fa-2x" onClick={props.close}></i>
			</div>
		</dialog>
	);
}
