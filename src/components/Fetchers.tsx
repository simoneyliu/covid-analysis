import axios from "axios";
import { useEffect, useState } from "react";
import { CovidData } from "../types/CustomTypes";

async function get(path: string) {
	try {
		const response = await axios.get(path);
		return response;
	} catch (error) {
		console.error(`GET from "${path}" error: `, error);
	}
}

const useFetch = (url: string) => {
	const [status, setStatus] = useState("idle");
	const [data, setData] = useState<CovidData>();

	useEffect(() => {
		if (!url) return;
		const fetchData = async () => {
			setStatus("fetching");
			const response = await axios.get(url);
			const data = response;
			setData(data.data);
			setStatus("fetched");
		};

		fetchData();
	}, [url]);

	return { status, data };
};

export { get, useFetch };
