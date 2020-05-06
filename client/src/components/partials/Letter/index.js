import React, { useState } from "react";

export default function Letter(props) {
	return (
		<div className="letterContainer">
			<h1>Leave a letter for {props.location}</h1>
		</div>
	);
}
