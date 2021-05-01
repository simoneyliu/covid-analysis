/* eslint-disable @typescript-eslint/no-useless-constructor */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import React from "react";
import { get } from "./Fetchers";
import { StatCard } from "./StatCard";

interface CollectionProps {}

interface CollectionState {
	allCountriesData: any;
	allStatesData: any;
}

class Collection extends React.Component<CollectionProps, CollectionState> {
	constructor(props: CollectionProps) {
		super(props);

		this.state = {
			allCountriesData: null,
			allStatesData: null,
		};
	}

	async componentDidMount() {
		let stateData = await get(
			"https://disease.sh/v3/covid-19/states?sort=state"
		);
		let countryData = await get(
			"https://disease.sh/v3/covid-19/countries?sort=country&allowNull="
		);
		this.setState({
			allStatesData: stateData?.data,
			allCountriesData: countryData?.data,
		});
	}

	convertMillisecondToDate(ms: number): string {
		const dateObject = new Date(ms);
		const humanDateFormat = dateObject.toLocaleString();
		return humanDateFormat;
	}

	getTodayCases(data: []) {
		let totalTodayCases = 0;
		let totalDeathCases = 0;

		data.forEach((state: any) => {
			totalTodayCases += state.todayCases;
			totalDeathCases += state.todayDeaths;
		});
		return [totalTodayCases, totalDeathCases];
	}

	render() {
		const allStatesData = this.state.allStatesData;
		const allCountriesData = this.state.allCountriesData;
		let todayDate = new Date().toLocaleDateString();
		let totalUSTodayCases = 0;
		let totalUSDeathCases = 0;
		let totalTodayCases = 0;
		let totalDeathCases = 0;

		if (allStatesData && allCountriesData) {
			console.log(allStatesData);
			console.log(allCountriesData);
			todayDate = this.convertMillisecondToDate(allStatesData[0].updated);
			[totalUSTodayCases, totalUSDeathCases] = this.getTodayCases(
				allStatesData
			);
			[totalTodayCases, totalDeathCases] = this.getTodayCases(allCountriesData);
		}

		const todayDataUS = {
			cases_us: totalUSTodayCases,
			deaths_us: totalUSDeathCases,
			cases_globally: totalTodayCases,
			deaths_globally: totalDeathCases,
		};
		return (
			<div className="collection">
				<p className="last_update">Last Updated: {todayDate}</p>
				<StatCard todayData={todayDataUS} />
			</div>
		);
	}
}

export { Collection };
