import React from "react";
import masks from "../assets/img/WearAMask.png";

class Panel extends React.Component {
	render() {
		return (
			<div className="wave-container">
				<div className="panel_img">
					<img src={masks} alt="mask"></img>
				</div>
				<svg
					preserveAspectRatio="none"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 1440 320"
				>
					<path d="M0,288L48,250.7C96,213,192,139,288,144C384,149,480,235,576,224C672,213,768,107,864,80C960,53,1056,107,1152,138.7C1248,171,1344,181,1392,186.7L1440,192L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
				</svg>
			</div>
		);
	}
}

export { Panel };
