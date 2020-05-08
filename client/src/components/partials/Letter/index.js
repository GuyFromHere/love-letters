import React, { useState } from "react";

export default function Letter(props) {

	return (
		<dialog id={props.id} className="letterContainer">
			{props.type === "letter" ? (<p>{props.text}</p>) : (<img src={props.src}></img>)}
			<button className="btnCancel" onClick={props.close}>
				CLOSE
			</button>
		</dialog>
	);
}
