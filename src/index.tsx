import React from "react";
import ReactDOM from "react-dom";
import "./assets/styles/ui.css";
import { Panel } from "./components/Panel";
import reportWebVitals from "./reportWebVitals";

class MasterWrapper extends React.Component {
	render() {
		return (
			<div className="master_wrapper">
				<Panel />
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
