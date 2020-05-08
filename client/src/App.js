import React from "react";
import Home from "./components/pages/Home";
import Nav from "./components/partials/Nav";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
	return (
		<div className="App">
			<Router>
				<div>
					<Nav />
					<Switch>
						<Route exact path="/" component={Home} />
					</Switch>
				</div>
			</Router>
		</div>
	);
}

export default App;
