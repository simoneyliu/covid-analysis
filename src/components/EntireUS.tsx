import { useFetch } from "./Fetchers";
import "react-circular-progressbar/dist/styles.css";
import { USCovidData } from "../types/USTypes";
import usFlag from "../assets/img/flag_us.png";
import Chart from "react-apexcharts";
import React from "react";
import { ActualsTimeseries } from "../types/USTimeSeriesTypes";

const { REACT_APP_COVID_API_KEY } = process.env;

function EntireUS() {
	const url_US_data = `https://api.covidactnow.org/v2/country/US.json?apiKey=${REACT_APP_COVID_API_KEY}`;
	const url_US_timeseries = `https://api.covidactnow.org/v2/country/US.timeseries.json?apiKey=${REACT_APP_COVID_API_KEY}`;

	const data = useFetch(url_US_data);
	const dataTimeSeries = useFetch(url_US_timeseries);

	let vaccinatedPercentage: any = 0;
	let totalVaccinated: any = "";
	let newCases: any = "";
	let newDeaths: any = "";
	let updateDate: any;

	function vaccinationsCompletedPercentage(data: USCovidData) {
		let percentage =
			(data.actuals.vaccinationsCompleted / data.population) * 100;
		return [
			data.actuals.vaccinationsCompleted.toLocaleString(),
			+percentage.toFixed(1),
		];
	}

	if (data) {
		[totalVaccinated, vaccinatedPercentage] = vaccinationsCompletedPercentage(
			data
		);
		newCases = data.actuals.newCases.toLocaleString();
		newDeaths = data.actuals.newDeaths.toLocaleString();
		var options: any = {
			year: "numeric",
			month: "long",
			day: "numeric",
		};
		const date = new Date(data.lastUpdatedDate);

		updateDate = date.toLocaleDateString("en-US", options);
	}

	let today = new Date();
	const oneDay = 86400000; //number of milliseconds in a day
	const lastThirtyDays = new Date(
		today.getTime() - 30 * oneDay
	).toLocaleDateString("fr-CA");

	let lastThirtyDaysData: ActualsTimeseries[] = [];

	if (dataTimeSeries) {
		dataTimeSeries.actualsTimeseries.forEach((day) => {
			if (day.date >= lastThirtyDays) {
				lastThirtyDaysData.push(day);
			}
		});
	}

	// console.log("30 days: ", lastThirtyDaysData);

	return (
		<div className="entire-us">
			<div className="dashboard_container">
				<div className="container">
					<div className="card">
						<div className="flag-container">
							<img src={usFlag} alt="us_flag"></img>
						</div>
						<h3 className="title">Total Vaccinated</h3>
						<h2 className="title big-font">{totalVaccinated}</h2>
						<h5 className="title small-font">
							in the US ({vaccinatedPercentage}%)
						</h5>

						<div className="bar">
							<div className="emptybar"></div>
							<div
								style={{ width: vaccinatedPercentage + "%" }}
								className="filledbar"
							></div>
						</div>
						<div className="cases">
							<div className="small-info">
								<h3>{newCases}</h3>
								<h5>New Cases</h5>
							</div>
							<div className="small-info">
								<h3>{newDeaths}</h3>
								<h5>New Deaths</h5>
							</div>
						</div>
						<div className="last-update">Updated on {updateDate}</div>
					</div>
				</div>
			</div>
			{lastThirtyDaysData.length > 0 ? (
				<div className="container">
					<div className="card card-spacing background-blue">
						<AreaChart dataTimeseries={lastThirtyDaysData} />
					</div>
				</div>
			) : (
				""
			)}
		</div>
	);
}

interface AreaChartState {
	options: any;
	series: any;
}

interface AreaChartProps {
	dataTimeseries: ActualsTimeseries[];
}

class AreaChart extends React.Component<AreaChartProps, AreaChartState> {
	constructor(props: AreaChartProps) {
		super(props);

		this.state = {
			options: null,
			series: null,
		};

		this.renderChart = this.renderChart.bind(this);
	}

	componentDidMount() {
		this.renderChart();
	}

	renderChart() {
		var dateArray: Array<String> = [];
		var newCases: Array<Number> = [];
		var newDeaths: Array<Number> = [];
		this.props.dataTimeseries.forEach((element) => {
			dateArray.push(element.date);
			newCases.push(element.newCases);
			newDeaths.push(element.newDeaths);
		});
		var options = {
			series: [
				{
					name: "Cases",
					data: newCases,
				},
				{
					name: "Deaths",
					data: newDeaths,
					color: "red",
				},
			],
			options: {
				title: {
					text: "Cases in the US",
					align: "left",
					style: {
						fontSize: "16px",
						color: "white",
					},
				},
				legend: {
					show: true,
					labels: {
						colors: "white",
					},
				},
				dataLabels: {
					enabled: false,
				},
				stroke: {
					curve: "smooth",
				},
				xaxis: {
					type: "datetime",
					categories: dateArray,
					labels: {
						show: true,
						style: {
							colors: "white",
						},
					},
				},
				yaxis: {
					min: 0,
					max: 90000,
					tickAmount: 5,
					forceNiceScale: false,
					labels: {
						show: true,
						style: {
							colors: ["white"],
						},
					},
					// logarithmic: true,
				},
			},
		};

		this.setState({ series: options.series, options: options.options });
	}

	render() {
		return (
			<div className="line-chart">
				{this.state.series ? (
					<Chart
						options={this.state.options}
						series={this.state.series}
						height="250"
						type="area"
					/>
				) : (
					""
				)}
			</div>
		);
	}
}

export { EntireUS };
