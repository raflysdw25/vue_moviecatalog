/* eslint-disable */

import { json_catalog } from '@/api/config'

const api_key = 'b06556dda660eba54ee84b7c6573cded'

export default {
	// GET METHOD
	showTvPopular(currentPage) {
		return json_catalog.get(`tv/popular?api_key=${api_key}&page=${currentPage}`)
	},

	showTvDetail(tvId) {
		return json_catalog.get(`tv/${tvId}?api_key=${api_key}`)
	},

	showMoviePopular(currentPage) {
		return json_catalog.get(
			`movie/popular?api_key=${api_key}&page=${currentPage}`
		)
	},

	showMovieDetail(movieId) {
		return json_catalog.get(`movie/${movieId}?api_key=${api_key}`)
	},
}
/* eslint-disable */
