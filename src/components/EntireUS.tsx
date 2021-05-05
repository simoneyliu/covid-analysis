import React from "react";
import { useFetch } from "./Fetchers";

function EntireUS(props: { url: string }) {
	const { status, data } = useFetch(props.url);

	console.log("status:", status);
	console.log("data:", data);

	return <div>{status}</div>;
}

export { EntireUS };
