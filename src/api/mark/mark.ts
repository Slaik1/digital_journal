import axios from "axios"

import { CONFIG } from "../../constants/config"

const ENDPOINT = CONFIG.baseUrl + 'mark/'

export const marks = {
	getTableMarks: async () => {
		const res = await axios.get(ENDPOINT + "getTableMarks", {
			params: {
				journalId: '663d37a8969366a8f9b74282'
			}
		})

		return res.data
	}
}