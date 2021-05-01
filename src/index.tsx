import React from "react";
import ReactDOM from "react-dom";
import "./assets/styles/ui.css";
import { Collection } from "./components/Collection";
import { Panel } from "./components/Panel";

class MasterWrapper extends React.Component {
	render() {
		return (
			<div className="master_wrapper">
				<Panel />
				<Collection />
			</div>
		);
	}
}

ReactDOM.render(
	<React.StrictMode>
		<MasterWrapper />
	</React.StrictMode>,
	document.getElementById("root")
);
