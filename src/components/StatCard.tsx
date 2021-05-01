import React from "react";
import death from "../assets/img/death-covid.png";
import cases from "../assets/img/icon_germ.png";
import { TodayReport } from "./Collection";

interface StatCardProps {
	yesterdayData: TodayReport;
	todayData: TodayReport;
	changeData: any;
}

class StatCard extends React.Component<StatCardProps> {
	getArrow = (percentage: number) => {
		if (percentage < 0) {
			return ["text-danger ", <strong>&#x2191;</strong>];
		} else {
			return ["text-success ", <strong>&#x2193;</strong>];
		}
	};

	render() {
		const { todayData, yesterdayData, changeData } = this.props;
		// console.log(todayData);
		// console.log(yesterdayData);
		// console.log(changeData);

		const [cases_us, cases_us_arrow] = this.getArrow(changeData.cases_us);
		const [cases_globally, cases_globally_arrow] = this.getArrow(
			changeData.cases_globally
		);
		const [deaths_us, deaths_us_arrow] = this.getArrow(changeData.deaths_us);
		const [deaths_globally, deaths_globally_arrow] = this.getArrow(
			changeData.deaths_globally
		);

		return (
			<div className="main-content">
				<div className="container-fluid">
					<div className="header-body">
						<div className="row">
							<div className="col-xl-3 col-lg-6">
								<div className="card card-stats mb-4 mb-xl-0">
									<div className="card-body">
										<div className="row">
											<div className="col">
												<h5 className="card-title text-uppercase text-muted mb-0">
													Globally - Today Cases
												</h5>
												<span className="h2 font-weight-bold mb-0">
													{todayData.cases_globally.toLocaleString()}
												</span>
											</div>
											<div className="col-auto">
												<div className="icon text-white">
													<img
														className="icon-img"
														src={cases}
														alt="mask"
													></img>
												</div>
											</div>
										</div>
										<p className="mt-3 mb-0 text-muted text-sm">
											<span className={cases_globally + "mr-2"}>
												<i className="fa fa-arrow-up"></i>
												{cases_globally_arrow}
												{Math.abs(changeData.cases_globally).toFixed(1)}%
											</span>
											<span className="text-nowrap">
												Since yesterday (
												{yesterdayData.cases_globally.toLocaleString()})
											</span>
										</p>
									</div>
								</div>
							</div>
							<div className="col-xl-3 col-lg-6">
								<div className="card card-stats mb-4 mb-xl-0">
									<div className="card-body">
										<div className="row">
											<div className="col">
												<h5 className="card-title text-uppercase text-muted mb-0">
													USA - Today Cases
												</h5>
												<span className="h2 font-weight-bold mb-0">
													{todayData.cases_us.toLocaleString()}
												</span>
											</div>
											<div className="col-auto">
												<div className="icon text-white">
													<img
														className="icon-img"
														src={cases}
														alt="mask"
													></img>
												</div>
											</div>
										</div>
										<p className="mt-3 mb-0 text-muted text-sm">
											<span className={cases_us + "mr-2"}>
												<i className="fa fa-arrow-up"></i>
												{cases_us_arrow}
												{Math.abs(changeData.cases_us).toFixed(1)}%
											</span>
											<span className="text-nowrap">
												Since yesterday (
												{yesterdayData.cases_us.toLocaleString()})
											</span>
										</p>
									</div>
								</div>
							</div>
							<div className="col-xl-3 col-lg-6">
								<div className="card card-stats mb-4 mb-xl-0">
									<div className="card-body">
										<div className="row">
											<div className="col">
												<h5 className="card-title text-uppercase text-muted mb-0">
													Globally - Today Deaths
												</h5>
												<span className="h2 font-weight-bold mb-0">
													{todayData.deaths_globally.toLocaleString()}
												</span>
											</div>
											<div className="col-auto">
												<div className="icon text-white">
													<img
														className="icon-img"
														src={death}
														alt="mask"
													></img>
												</div>
											</div>
										</div>
										<p className="mt-3 mb-0 text-muted text-sm">
											<span className={deaths_globally + "mr-2"}>
												<i className="fa fa-arrow-up"></i>
												{deaths_globally_arrow}
												{Math.abs(changeData.deaths_globally).toFixed(1)}%
											</span>
											<span className="text-nowrap">
												Since yesterday (
												{yesterdayData.deaths_globally.toLocaleString()})
											</span>
										</p>
									</div>
								</div>
							</div>
							<div className="col-xl-3 col-lg-6">
								<div className="card card-stats mb-4 mb-xl-0">
									<div className="card-body">
										<div className="row">
											<div className="col">
												<h5 className="card-title text-uppercase text-muted mb-0">
													USA - Today Deaths
												</h5>
												<span className="h2 font-weight-bold mb-0">
													{todayData.deaths_us.toLocaleString()}
												</span>
											</div>
											<div className="col-auto">
												<div className="icon text-white">
													<img
														className="icon-img"
														src={death}
														alt="mask"
													></img>
												</div>
											</div>
										</div>
										<p className="mt-3 mb-0 text-muted text-sm">
											<span className={deaths_us + "mr-2"}>
												<i className="fa fa-arrow-up"></i>
												{deaths_us_arrow}
												{Math.abs(changeData.deaths_us).toFixed(1)}%
											</span>
											<span className="text-nowrap">
												Since yesterday (
												{yesterdayData.deaths_us.toLocaleString()})
											</span>
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export { StatCard };
