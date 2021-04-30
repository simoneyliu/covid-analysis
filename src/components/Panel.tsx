import React from "react";

class Panel extends React.Component {
	render() {
		return (
			<div className="panel_container">
				<div className="svg_container">
					<svg
						viewBox="0 0 500 150"
						preserveAspectRatio="none"
						className="wave"
					>
						<path d="M-22.01,101.14 C149.99,150.00 271.44,-24.17 537.81,103.13 L500.00,0.00 L0.00,0.00 Z"></path>
					</svg>
				</div>
			</div>
		);
	}
}

export { Panel };
