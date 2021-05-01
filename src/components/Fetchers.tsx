import axios from "axios";

// async function get<T>(path: string): Promise<T> {
// 	const { data } = await axios.get(path);
// 	return data;
// }

// Make a request for a user with a given ID
async function get(path: string) {
	try {
		const response = await axios.get(path);
		return response;
	} catch (error) {
		console.error(`GET from "${path}" error: `, error);
	}
}

export { get };
