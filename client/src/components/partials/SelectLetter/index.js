import React from 'react';

export default function SelectLetter(props) {
	return (
		<button className="selectLetter" onClick={props.handleClick} >
			{props.text}
		</button>)
}