import axios from "axios";
import { useEffect, useState } from "react";
import { USTimeSeries } from "../types/USTimeSeriesTypes";
import { USCovidData } from "../types/USTypes";

async function get(path: string) {
	try {
		const response = await axios.get(path);
		return response;
	} catch (error) {
		console.error(`GET from "${path}" error: `, error);
	}
}

const useFetch = (url: string) => {
	const [data, setData] = useState<USTimeSeries>();

	useEffect(() => {
		if (!url) return;
		const fetchData = async () => {
			const response = await axios.get(url);
			const data = response;
			setData(data.data);
		};

		fetchData();
	}, [url]);

	return data;
};

export { get, useFetch };
