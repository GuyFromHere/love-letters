import React from "react";
import "./style.css";
import Letter from "../../../images/markers/letter.png";

export default function Nav() {
	return (
		<ul>
			<li>
				<a href="/">Home</a>
			</li>
			<li>
				<a href="/go">Go</a>
			</li>
			<li>
				<a href="/capture">Capture</a>
			</li>
		</ul>
	);
}
