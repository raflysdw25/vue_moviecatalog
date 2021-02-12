<template>
	<!-- eslint-disable -->
	<div class="tv-show-container">
		<b-container>
			<h1 class="mb-2">Popular TV Shows</h1>
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
					<b-button
						variant="info"
						size="sm"
						class="ml-2"
						v-b-tooltip.hover
						title="Display Item in Table"
						@click="displayItem"
						v-if="displayGrid"
					>
						<b-icon icon="table"></b-icon>
					</b-button>
					<b-button
						variant="info"
						size="sm"
						class="ml-2"
						v-b-tooltip.hover
						title="Display Item in Grid"
						@click="displayItem"
						v-if="!displayGrid"
					>
						<b-icon icon="grid3x3-gap-fill"></b-icon>
					</b-button>
				</b-col>
				<b-col cols="5">
					<div class="pagination-center">
						<ul v-if="tvshows.length > 0 && loading === false">
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
			<template v-if="loading">
				<div class="loading text-center">
					<img src="@/assets/image/icon/UploadLoader.gif" width="160" />
				</div>
			</template>
			<template v-else>
				<ShowItem
					:tvshows="tvshows"
					v-if="displayGrid"
					:sortDisplay="sortDisplay"
				/>
				<TableShow
					:values="tvshows"
					:sortDisplay="sortDisplay"
					v-if="!displayGrid"
				/>
			</template>
		</b-container>
	</div>
	<!-- eslint-disable -->
</template>

<script>
	/* eslint-disable */
	// @ is an alias to /src

	// Component
	import ShowItem from '@/components/ShowItem.vue'
	import TableShow from '@/components/TableShow.vue'

	// API
	import api from '@/api/api_catalog'

	export default {
		name: 'TvShow',
		components: {
			ShowItem,
			TableShow,
		},
		data() {
			return {
				tvshows: [],
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
			await this.loadPopularTv()
			this.loading = false
		},
		methods: {
			async loadPopularTv() {
				try {
					const response = await api.showTvPopular(this.pageNo)
					console.log(response)
					this.tvshows = response.data.results
				} catch (error) {
					console.log(error)
					alert(error)
				}
			},
			jumpPage(page) {
				if (this.pageNo !== page) {
					this.pageNo = page
					this.loadPopularTv()
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
