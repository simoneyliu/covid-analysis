import { useFetch } from "./Fetchers";
import "react-circular-progressbar/dist/styles.css";
import { USCovidData } from "../types/USTypes";
import usFlag from "../assets/img/flag_us.png";

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
		console.log(percentage);
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

	if (dataTimeSeries) {
		console.log("dataTimeSeries: ", dataTimeSeries);
	}

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
					</div>
				</div>
			</div>
			<div className="last-update">Updated on {updateDate}</div>

			{/* <Chart
				width={"100%"}
				height={isMobile ? "30vh" : "80%"}
				chartType="GeoChart"
				data={[
					["Country", "Popularity"],
					["Germany", 200],
					["United States", 300],
					["Brazil", 400],
					["Canada", 500],
					["France", 600],
					["RU", 700],
				]}
				// Note: you will need to get a mapsApiKey for your project.
				// See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
				mapsApiKey="YOUR_KEY_HERE"
				rootProps={{ "data-testid": "1" }}
			/> */}
		</div>
	);
}

export { EntireUS };
