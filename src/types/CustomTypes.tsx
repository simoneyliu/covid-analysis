export interface DailyReport {
	updated: number;
	cases: number;
	todayCases: number;
	deaths: number;
	todayDeaths: number;
	recovered: number;
	active: number;
	critical: number;
	casesPerOneMillion: number;
	deathsPerOneMillion: number;
	tests: number;
	testsPerOneMillion: number;
	affectedCountries: number;
}

export interface CovidData {
	actuals: Actuals;
	annotations: Annotations;
	country: string;
	county: string;
	fips: string;
	lastUpdatedDate: string;
	lat: number;
	level: string;
	locationId: string;
	long: number;
	metrics: Metrics;
	population: number;
	riskLevels: RiskLevels;
	state: string;
	url: string;
}

export interface Actuals {
	cases: number;
	contactTracers: number;
	deaths: number;
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
	negativeTests: number;
	newCases: number;
	newDeaths: number;
	positiveTests: number;
	vaccinationsCompleted: number;
	vaccinationsInitiated: number;
	vaccinationsInitiatedDemographics: number;
	vaccinesAdministered: number;
	vaccinesAdministeredDemographics: number;
	vaccinesDistributed: number;
}

export interface Annotations {
	caseDensity: number;
	cases: number;
	contactTracerCapacityRatio: number;
	contactTracers: number;
	deaths: number;
	hospitalBeds: number;
	icuBeds: number;
	icuCapacityRatio: number;
	icuHeadroomRatio: number;
	infectionRate: number;
	infectionRateCI90: number;
	negativeTests: number;
	newCases: number;
	newDeaths: number;
	positiveTests: number;
	testPositivityRatio: number;
	vaccinationsCompleted: number;
	vaccinationsCompletedRatio: number;
	vaccinationsInitiated: number;
	vaccinationsInitiatedRatio: number;
	vaccinesAdministered: number;
	vaccinesDistributed: number;
}

export interface Metrics {
	caseDensity: number;
	contactTracerCapacityRatio: number;
	icuCapacityRatio: number;
	icuHeadroomDetails: {
		currentIcuCovid: number;
		currentIcuCovidMethod: string;
		currentIcuNonCovid: number;
		currentIcuNonCovidMethod: string;
	};
	icuHeadroomRatio: number;
	infectionRate: number;
	infectionRateCI90: number;
	testPositivityRatio: number;
	testPositivityRatioDetails: { source: string };
	vaccinationsCompletedRatio: number;
	vaccinationsInitiatedRatio: number;
}

export interface RiskLevels {
	caseDensity: number;
	contactTracerCapacityRatio: number;
	icuCapacityRatio: number;
	icuHeadroomRatio: number;
	infectionRate: number;
	overall: number;
	testPositivityRatio: number;
}
