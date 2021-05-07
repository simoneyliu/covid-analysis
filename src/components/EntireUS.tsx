import { useFetch } from "./Fetchers";
import "react-circular-progressbar/dist/styles.css";
import { CovidData } from "../types/CustomTypes";

function EntireUS(props: { url: string }) {
	const { status, data } = useFetch(props.url);
	let vaccinatedPercentage: any = 0;
	let totalVaccinated: any = "";
	let newCases: any = "";
	let newDeaths: any = "";
	let updateDate: any;

	if (status === "fetched") {
		console.log(data);
	}
	// const percentage = 66;

	function vaccinationsCompletedPercentage(data: CovidData) {
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

//Compare 7 - 30days
/* <div className="metric">
							<div className="metric-inner">
								<header className="metric-header">
									<div className="metric-title">7 and 30 Day Comparison</div>
								</header>
								<div className="metric-body viz-basic-with-7-and-40-day-comparison">
									<div className="value">
										<div className="current-value">
											<div className="primary-value">210</div>
											<div>cases</div>
										</div>
										<div className="comparison_wrapper">
											<div className="left_comparison">
												<div className="green">&#9660; 10%</div>
												<div>7 days ago</div>
											</div>
											<div className="right_comparison">
												<div className="red">&#9650; 12%</div>
												<div>30 days ago</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div> */
