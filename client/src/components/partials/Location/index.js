import React, { useState } from "react";
import Map from "../../partials/Map";
import { Input, Label, FormBtn } from "../../partials/Form";
import API from "../../../utils/api";

export default function Location(props) {
	return (
		<div className="locationContainer">
			<Label />
			<Input id="locationInput" onKeyDown={(e) => props.onKeyDown(e)} />
			<FormBtn
				value="Click"
				onClick={() => {
					props.handleClick();
				}}
			>
				Click
			</FormBtn>
			{props.location ? <Map mapUri={props.mapUri} /> : null}
		</div>
	);
}
