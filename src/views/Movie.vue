<template>
	<!-- eslint-disable -->
	<div class="tv-show-container">
		<b-container>
			<h1 class="mb-2">Popular Movies</h1>
			<b-row class="mb-4">
				<b-col>
					<b-dropdown size="sm" text="Sort Display" variant="info">
						<b-dropdown-item-button
							v-for="display in displayShows"
							:key="display"
							@click="countDisplay(display)"
							>{{
								display === 0 ? 'All Shows' : display
							}}</b-dropdown-item-button
						>
					</b-dropdown>
				</b-col>
				<b-col cols="5">
					<div class="pagination-center">
						<ul v-if="movies.length > 0 && loading === false">
							<li v-for="num in pageTotal" :key="num">
								<a
									style="cursor: pointer"
									v-on:click="jumpPage(num)"
									:class="[num === pageNo ? 'active' : '']"
									>{{ num }}
								</a>
							</li>
						</ul>
					</div>
				</b-col>
			</b-row>
			<div class="loading text-center" v-if="loading">
				<img src="@/assets/image/icon/UploadLoader.gif" width="160" />
			</div>
			<ShowItem v-else :shows="movies" :sortDisplay="sortDisplay" />
		</b-container>
	</div>
	<!-- eslint-disable -->
</template>

<script>
	/* eslint-disable */
	// @ is an alias to /src

	// Component
	import ShowItem from '@/components/ShowItem.vue'

	// API
	import api from '@/api/api_catalog'

	export default {
		name: 'Movie',
		components: {
			ShowItem,
		},
		data() {
			return {
				movies: [],
				displayShows: [0, 3, 5, 10],
				sortDisplay: 0,
				displayGrid: true,
				pageNo: 1,
				pageTotal: 10,
				loading: false,
			}
		},
		async mounted() {
			this.loading = true
			await this.loadPopularMovie()
			this.loading = false
		},
		methods: {
			async loadPopularMovie() {
				try {
					const response = await api.showMoviePopular(this.pageNo)
					this.movies = response.data.results
				} catch (error) {
					alert(error)
				}
			},
			jumpPage(page) {
				if (this.pageNo !== page) {
					this.pageNo = page
					this.loadPopularMovie()
				}
			},
			countDisplay(count) {
				this.sortDisplay = count
			},
			displayItem() {
				this.displayGrid = !this.displayGrid
			},
		},
	}
	/* eslint-disable */
</script>
<style lang="scss">
	.pagination-center ul {
		list-style: none;
		display: flex;
		padding: 0 160px;
	}

	.pagination-center li a {
		padding: 10px;
		font-size: 12px;
		color: #bfbfbf !important;
	}

	.pagination-center li .active {
		padding: 6px 10px;
		font-size: 12px;
		color: #000000 !important;
		background: #e8e8e8;
		height: 10px !important;
		width: 10px !important;
		border-radius: 45px;
	}
</style>
