import { Actuals, Annotations, Metrics, RiskLevels } from "./USTypes";

export interface USTimeSeries {
	fips: string;
	country: string;
	state: string;
	county: string;
	level: string;
	lat: number;
	locationId: string;
	long: number;
	population: number;
	metrics: Metrics;
	riskLevels: RiskLevels;
	actuals: Actuals;
	annotations: Annotations;
	lastUpdatedDate: string;
	url: string;
	metricsTimeseries: MetricsTimeSeries;
	actualsTimeseries: ActualsTimeseries;
	riskLevelsTimeseries: RiskLevelsTimeseries;
}

export interface MetricsTimeSeries {
	testPositivityRatio: number;
	caseDensity: number;
	contactTracerCapacityRatio: number;
	infectionRate: number;
	infectionRateCI90: number;
	icuHeadroomRatio: number;
	icuCapacityRatio: number;
	date: string;
}

export interface ActualsTimeseries {
	cases: number;
	deaths: number;
	positiveTests: number;
	negativeTests: number;
	contactTracers: number;
	hospitalBeds: {
		capacity: number;
		currentUsageTotal: number;
		currentUsageCovid: number;
		typicalUsageRate: number;
	};
	icuBeds: {
		capacity: number;
		currentUsageTotal: number;
		currentUsageCovid: number;
		typicalUsageRate: number;
	};
	newCases: number;
	newDeaths: number;
	vaccinesAdministeredDemographics: number;
	vaccinationsInitiatedDemographics: number;
	date: string;
}

export interface RiskLevelsTimeseries {
	overall: number;
	date: string;
}
