/* eslint-disable */
import axios from 'axios'

const domain_catalog = process.env.VUE_APP_BASE_API_CATALOG
const domain_quiz = process.env.VUE_APP_BASE_API_QUIZ

const baseUrl_catalog = `${domain_catalog}`
const baseUrl_quiz = `${domain_quiz}`

export const json_catalog = axios.create({
	baseURL: baseUrl_catalog,
	headers: {
		'Content-type': 'application/json',
	},
})
export const json_quiz = axios.create({
	baseURL: baseUrl_quiz,
	headers: {
		'Content-type': 'application/json',
	},
})

/* eslint-disable */
