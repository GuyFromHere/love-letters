import React, { useState } from "react";
import Leave from "../../partials/Leave";
import Read from "../../partials/Read";
import SelectLetter from "../../partials/SelectLetter";
import './style.css';

export default function Home() {
	const [choice, setChoice] = useState();

	const handleClick = (choice) => {
		console.log('home handleClick')
		console.log(choice)
		setChoice(choice);
	}

	return (
		<div className="container">
			{ choice === "leave" ? <Leave /> :
			choice === "read" ? <Read /> :
			(<div>
				<SelectLetter handleClick={() => {handleClick("leave")}} text="Leave a letter."/>
				<SelectLetter handleClick={() => {handleClick("read")}} text="Read a letter."/>
			</div>)
			}
		</div>
		);
}
