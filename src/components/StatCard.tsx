import React from "react";
import death from "../assets/img/death-covid.png";
import cases from "../assets/img/icon_germ.png";

interface StatCardProps {
	yesterdayData?: any;
	todayData: any;
}

class StatCard extends React.Component<StatCardProps> {
	constructor(props: StatCardProps) {
		super(props);
	}

	render() {
		const { todayData } = this.props;
		console.log(todayData);
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
										{/* <p className="mt-3 mb-0 text-muted text-sm">
											<span className="text-success mr-2">
												<i className="fa fa-arrow-up"></i> 3.48%
											</span>
											<span className="text-nowrap">Since last month</span>
										</p> */}
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
										{/* <p className="mt-3 mb-0 text-muted text-sm">
											<span className="text-danger mr-2">
												<i className="fas fa-arrow-down"></i> 3.48%
											</span>
											<span className="text-nowrap">Since last week</span>
										</p> */}
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
										{/* <p className="mt-3 mb-0 text-muted text-sm">
											<span className="text-warning mr-2">
												<i className="fas fa-arrow-down"></i> 1.10%
											</span>
											<span className="text-nowrap">Since yesterday</span>
										</p> */}
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
										{/* <p className="mt-3 mb-0 text-muted text-sm">
											<span className="text-success mr-2">
												<i className="fas fa-arrow-up"></i> 12%
											</span>
											<span className="text-nowrap">Since last month</span>
										</p> */}
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
