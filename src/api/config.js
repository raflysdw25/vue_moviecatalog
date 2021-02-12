/* eslint-disable */
import axios from 'axios'

const domain_catalog = process.env.VUE_APP_BASE_API_CATALOG

const baseUrl_catalog = `${domain_catalog}`

export const json_catalog = axios.create({
	baseURL: baseUrl_catalog,
	headers: {
		'Content-type': 'application/json',
	},
})

/* eslint-disable */
