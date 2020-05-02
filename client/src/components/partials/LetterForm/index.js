import React from 'react';
import { TextArea, FormBtn } from '../Form';

export default function LetterForm (props) {

	const handleClick = () => {
		console.log('LetterForm handleClick...send this to db with location and be done')
		console.log(document.getElementById("letterText").value)
		console.log(props.location)
	}

	return (
		<div className="letterFormContainer">
			<h1>Enter your text:</h1>
			<TextArea id="letterText" />
			<FormBtn 
			onClick={handleClick}>
				Send!	
			</FormBtn>
		</div>
	)
}