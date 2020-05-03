import React from 'react';
import { TextArea, FormBtn } from '../Form';
import API from '../../../utils/api';


export default function LetterForm (props) {

	const handleClick = () => {
		const letterText = document.getElementById("letterText").value
		API.sendLetter(props.location, letterText).then(result => {
			console.log('letterform send letter res')
			console.log(result)
			if (result) {
				// redirect
			}
		});
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