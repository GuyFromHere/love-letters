import React from "react";

export default function Map(props) {
	return (
		<div className="mapContainer">
			<img src={props.location} alt="Static map of {props.location}"></img>
		</div>
	);
}
