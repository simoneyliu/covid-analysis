import React from "react";
import { EntireUS } from "./EntireUS";

const { REACT_APP_COVID_API_KEY } = process.env;

class Home extends React.Component {
	render() {
		return (
			<div>
				<EntireUS
					url={`https://api.covidactnow.org/v2/country/US.json?apiKey=${REACT_APP_COVID_API_KEY}`}
				/>
			</div>
		);
	}
}

export { Home };
