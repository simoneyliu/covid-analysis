import { useFetch } from "./Fetchers";
import "react-circular-progressbar/dist/styles.css";
import { USCovidData } from "../types/USTypes";
import usFlag from "../assets/img/flag_us.png";
import Chart from "react-apexcharts";
import React, { Component } from "react";
import { ActualsTimeseries } from "../types/USTimeSeriesTypes";
import { data } from "jquery";

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

	function getColorByPercent(percent: number) {
		if (percent < 50) {
			return "red";
		} else if (percent >= 50 && percent < 70) {
			return "yellow";
		} else {
			return "green";
		}
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

	console.log("30 days: ", lastThirtyDaysData);

	let isMobile = false;
	if (window.screen.width < 800) {
		isMobile = true;
	}

	return (
		<div className="entire-us">
			<div className="dashboard_container">
				{/* <div className="circle_container">
					<ChangingProgressProvider
						values={[0, vaccinatedPercentage]}
						repeat={false}
					>
						{(percentage: any) => (
							<CircularProgressbar
								value={percentage}
								text={`${percentage}%`}
								styles={buildStyles({
									textColor: getColorByPercent(percentage),
									pathColor: getColorByPercent(percentage),
									textSize: "14px",
								})}
							/>
						)}
					</ChangingProgressProvider>
				</div> */}
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
					<div className="card card-margin background-blue">
						<LineChart dataTimeseries={lastThirtyDaysData} />
					</div>
				</div>
			) : (
				""
			)}
		</div>
	);
}

interface LineChartState {
	options: any;
	series: any;
}

interface LineChartProps {
	dataTimeseries: ActualsTimeseries[];
}

class LineChart extends React.Component<LineChartProps, LineChartState> {
	constructor(props: LineChartProps) {
		super(props);

		this.renderChart();
	}

	renderChart = () => {
		var dateArray: Array<String> = [];
		var newCases: Array<Number> = [];
		this.props.dataTimeseries.forEach((element) => {
			dateArray.push(element.date);
			newCases.push(element.newCases);
		});
		this.state = {
			series: [
				{
					name: "Cases",
					data: newCases,
				},
			],
			options: {
				chart: {
					height: 350,
					type: "line",
				},
				stroke: {
					width: 7,
					curve: "smooth",
				},
				xaxis: {
					type: "datetime",
					categories: dateArray,
					tickAmount: 10,
				},
				title: {
					text: "Covid Cases",
					align: "left",
					style: {
						fontSize: "16px",
						color: "white",
					},
				},
				fill: {
					type: "gradient",
					gradient: {
						shade: "dark",
						gradientToColors: ["#FDD835"],
						shadeIntensity: 1,
						type: "horizontal",
						opacityFrom: 1,
						opacityTo: 1,
						stops: [0, 100, 100, 100],
					},
				},
				markers: {
					size: 4,
					colors: ["#FFA41B"],
					strokeColors: "#fff",
					strokeWidth: 2,
					hover: {
						size: 7,
					},
				},
				yaxis: {
					min: 0,
					title: {
						text: "Cases",
					},
				},
				sparkline: {
					enabled: true,
				},
				grid: {
					row: {
						colors: "transparent",
					},
				},
			},
		};
	};

	render() {
		return (
			<div className="line-chart">
				<Chart
					options={this.state.options}
					series={this.state.series}
					height="280"
				/>
			</div>
		);
	}
}

export { EntireUS };
