import React from "react";
// import masks from "../assets/img/WearAMask.png";
import { MenuComponent } from "./Menu";

class Panel extends React.Component {
	render() {
		return (
			<div className="sticky">
				<MenuComponent />
			</div>
		);
	}
}

export { Panel };
