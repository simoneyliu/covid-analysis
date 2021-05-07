/* eslint-disable @typescript-eslint/no-useless-constructor */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import React from "react";
import { get } from "./Fetchers";
import { StatCard } from "./StatCard";

export interface TodayReport {
	cases_us: number;
	deaths_us: number;
	cases_globally: number;
	deaths_globally: number;
}

interface CollectionProps {}

interface CollectionState {
	allCountriesDataToday: any;
	allStatesDataToday: any;
	allCountriesDataYesterday: any;
	allStatesDataYesterday: any;
	isFetching: boolean;
}

class Collection extends React.Component<CollectionProps, CollectionState> {
	constructor(props: CollectionProps) {
		super(props);

		this.state = {
			allCountriesDataToday: null,
			allStatesDataToday: null,
			allCountriesDataYesterday: null,
			allStatesDataYesterday: null,
			isFetching: false,
		};

		this.refreshData = this.refreshData.bind(this);
		this.setData = this.setData.bind(this);
	}

	async componentDidMount() {
		this.setData();
	}

	forceUpdateHandler() {
		this.forceUpdate();
	}

	async setData() {
		const stateDataToday = await get(
			"https://disease.sh/v3/covid-19/states?sort=state"
		);
		const countryDataToday = await get(
			"https://disease.sh/v3/covid-19/countries?sort=country&allowNull=false"
		);
		const stateDataYesterday = await get(
			"https://disease.sh/v3/covid-19/states?sort=state&yesterday=true"
		);
		const countryDataYesterday = await get(
			"https://disease.sh/v3/covid-19/countries?yesterday=true&sort=country&allowNull=false"
		);
		this.setState({
			allStatesDataToday: stateDataToday?.data,
			allCountriesDataToday: countryDataToday?.data,
			allStatesDataYesterday: stateDataYesterday?.data,
			allCountriesDataYesterday: countryDataYesterday?.data,
		});
	}

	async refreshData() {
		this.setState({ isFetching: true });
		this.setData();
		this.setState({ isFetching: false });
	}

	convertMillisecondToDate(ms: number): string {
		const dateObject = new Date(ms);
		const humanDateFormat = dateObject.toLocaleString();
		return humanDateFormat;
	}

	getCasesAndDeaths(data: []) {
		let totalTodayCases = 0;
		let totalDeathCases = 0;

		data.forEach((state: any) => {
			totalTodayCases += state.todayCases;
			totalDeathCases += state.todayDeaths;
		});
		return [totalTodayCases, totalDeathCases];
	}

	getTotal(stateData: [], countryData: []): TodayReport {
		let totalUSTodayCases = 0;
		let totalUSDeathCases = 0;
		let totalTodayCases = 0;
		let totalDeathCases = 0;

		if (stateData && countryData) {
			[totalUSTodayCases, totalUSDeathCases] = this.getCasesAndDeaths(
				stateData
			);
			[totalTodayCases, totalDeathCases] = this.getCasesAndDeaths(countryData);
		}

		const todayData = {
			cases_us: totalUSTodayCases,
			deaths_us: totalUSDeathCases,
			cases_globally: totalTodayCases,
			deaths_globally: totalDeathCases,
		};
		return todayData;
	}

	getChangePercentage(today: TodayReport, yesterday: TodayReport) {
		let cases_us =
			((yesterday.cases_us - today.cases_us) / yesterday.cases_us) * 100;
		let cases_globally =
			((yesterday.cases_globally - today.cases_globally) /
				yesterday.cases_globally) *
			100;
		let deaths_us =
			((yesterday.deaths_us - today.deaths_us) / yesterday.deaths_us) * 100;
		let deaths_globally =
			((yesterday.deaths_globally - today.deaths_globally) /
				yesterday.deaths_globally) *
			100;
		return { cases_us, cases_globally, deaths_us, deaths_globally };
	}

	render() {
		const stateDataToday = this.state.allStatesDataToday;
		const countryDataToday = this.state.allCountriesDataToday;
		const stateDataYesterday = this.state.allStatesDataYesterday;
		const countryDataYesterday = this.state.allCountriesDataYesterday;
		let todayDate = new Date().toLocaleDateString();
		let todayTotalData = null;
		let yesterdayTotalData = null;
		let changeData = null;

		if (
			stateDataToday &&
			countryDataToday &&
			stateDataYesterday &&
			countryDataYesterday
		) {
			// console.log(stateDataToday);
			// console.log(countryDataToday);
			todayDate = this.convertMillisecondToDate(stateDataToday[0].updated);
			todayTotalData = this.getTotal(stateDataToday, countryDataToday);
			yesterdayTotalData = this.getTotal(
				stateDataYesterday,
				countryDataYesterday
			);
			changeData = this.getChangePercentage(todayTotalData, yesterdayTotalData);
		}

		return (
			<div className="collection">
				<p className="last_update">
					Last Updated: {todayDate}{" "}
					<button className="refresh_button" onClick={() => this.refreshData()}>
						&#8635;
					</button>
				</p>
				{todayTotalData && yesterdayTotalData ? (
					<StatCard
						todayData={todayTotalData}
						yesterdayData={yesterdayTotalData}
						changeData={changeData}
					/>
				) : (
					""
				)}
			</div>
		);
	}
}

export { Collection };
