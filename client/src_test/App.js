import React from "react";
import Home from "./components/pages/Home";
import Go from "./components/pages/Go";
import Capture from "./components/pages/Capture";
import Nav from "./components/partials/Nav";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

function App() {
	return (
		<div className="App">
			<Router>
				<div>
					<Nav />
					<Switch>
						<Route exact path="/" component={Home} />
						<Route exact path="/go" component={Go} />
						<Route exact path="/capture" component={Capture} />
					</Switch>
				</div>
			</Router>
		</div>
	);
}

export default App;
