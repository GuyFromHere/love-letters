import React, { useState } from "react";

export default function Letter(props) {

	return (
		<dialog id={props.id} className="letterContainer">
			<p>{props.text}</p>
			<button className="btnCancel" onClick={props.close}>
				CLOSE
			</button>
		</dialog>
	);
}
