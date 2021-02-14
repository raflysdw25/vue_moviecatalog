<template>
	<!-- eslint-disable -->
	<div class="show-item-container">
		<b-row v-if="sortDisplay === 0">
			<b-col lg="4" md="6" v-for="show in shows" :key="show.id">
				<b-card
					overlay
					:img-src="
						show.poster_path === null
							? require('@/assets/image/poster_null.jpg')
							: imagePosterUrl + show.poster_path
					"
					:img-alt="
						show.original_name ? show.original_name : show.original_title
					"
					:title="show.name ? show.name : show.title"
					class="mb-3"
				>
					<b-button
						class="bg-main"
						@click="detailShow(show.id)"
						v-b-modal.detailModal
					>
						Lihat Detail
					</b-button>
				</b-card>
			</b-col>
		</b-row>
		<b-row v-if="sortDisplay > 0">
			<b-col lg="4" md="6" v-for="index in sortDisplay" :key="shows[index].id">
				<b-card
					overlay
					:img-src="
						shows[index].poster_path === null
							? require('@/assets/image/poster_null.jpg')
							: imagePosterUrl + shows[index].poster_path
					"
					:img-alt="shows[index].original_name"
					:title="shows[index].name"
					class="mb-3"
				>
					<b-button
						class="bg-main"
						@click="detailShow(shows[index].id)"
						v-b-modal.detailModal
					>
						Lihat Detail
					</b-button>
				</b-card>
			</b-col>
		</b-row>
		<b-modal
			id="detailModal"
			v-if="showDetail"
			hide-footer
			size="xl"
			hide-header
			title="TV Show Detail"
		>
			<b-row id="detail-show">
				<template v-if="loading">
					<b-col lg="12">
						<div class="loading text-center">
							<img src="@/assets/image/icon/UploadLoader.gif" width="160" />
						</div>
					</b-col>
				</template>
				<template v-else>
					<b-col lg="12">
						<b-img
							:src="
								showDetail.backdrop_path === null
									? require('@/assets/image/backdrop_null.jpg')
									: `${imageBackdropUrl}${showDetail.backdrop_path}`
							"
							fluid-grow
							style="border-radius: 20px; "
							:alt="`backdrop_${showDetail.name}`"
						></b-img>
					</b-col>
					<b-col lg="5" class="mt-4">
						<div class="title">
							<p class="detail-title">
								{{ showDetail.name ? showDetail.name : showDetail.title }}
							</p>
							<p class="detail-rilis">
								{{
									showDetail.first_air_date
										? showDetail.first_air_date
										: showDetail.release_date
								}}
							</p>
						</div>
						<div class="detail-genre mt-4">
							<h4>Genre</h4>
							<ol>
								<li v-for="genre in showDetail.genres" :key="genre.id">
									{{ genre.name }}
								</li>
							</ol>
						</div>
						<div class="detail-website mt-4">
							<h4>Website</h4>
							<a :href="showDetail.homepage" target="_blank">
								{{ showDetail.homepage }}
							</a>
						</div>
					</b-col>
					<b-col lg="7" class="mt-4">
						<div class="detail-overview">
							<h4>Overview</h4>
							<p>
								{{ showDetail.overview }}
							</p>
						</div>
						<template v-if="showDetail.networks">
							<h4>Networks</h4>
							<b-row>
								<b-col
									cols="2"
									v-for="network in showDetail.networks"
									:key="network.id"
								>
									<figure
										class="d-flex"
										v-b-tooltip.hover.bottom="network.name"
									>
										<img
											class="mx-auto"
											:src="
												network.logo_path === null
													? require('@/assets/image/logo_null.png')
													: imageLogoUrl + network.logo_path
											"
											:alt="`network_${network.name}`"
										/>
									</figure>
								</b-col>
							</b-row>
						</template>
						<template v-else-if="showDetail.production_companies">
							<h4>Produce By</h4>
							<b-row>
								<b-col
									cols="2"
									v-for="company in showDetail.production_companies"
									:key="company.id"
								>
									<figure
										class="d-flex"
										v-b-tooltip.hover.bottom="company.name"
									>
										<img
											class="mx-auto"
											:src="
												company.logo_path === null
													? require('@/assets/image/logo_null.png')
													: imageLogoUrl + company.logo_path
											"
											:alt="`production_by_${company.name}`"
										/>
									</figure>
								</b-col>
							</b-row>
						</template>
					</b-col>
				</template>
			</b-row>
		</b-modal>
	</div>
</template>

<script>
	/* eslint-disable */
	// API
	import api from '@/api/api_catalog'

	export default {
		props: {
			shows: Array,
			sortDisplay: Number,
		},
		data: function() {
			return {
				showDetail: {},
				loading: false,
			}
		},
		computed: {
			imageBackdropUrl() {
				return `${process.env.VUE_APP_URL_BACKDROP}`
			},
			imagePosterUrl() {
				return `${process.env.VUE_APP_URL_POSTER}`
			},
			imageLogoUrl() {
				return `${process.env.VUE_APP_URL_LOGO}`
			},
		},
		methods: {
			async detailShow(showId) {
				this.loading = true
				if (this.$route.name === 'Movie') {
					await this.movieDetail(showId)
				} else if (this.$route.name === 'TvShow') {
					await this.tvShowDetail(showId)
				}
				this.loading = false
			},
			async tvShowDetail(id) {
				try {
					const response = await api.showTvDetail(id)
					this.showDetail = response.data
				} catch (error) {
					alert(error)
				}
			},
			async movieDetail(id) {
				try {
					const response = await api.showMovieDetail(id)
					this.showDetail = response.data
				} catch (error) {
					alert(error)
				}
			},
		},
	}
</script>

<style lang="scss" scoped>
	.card {
		border-radius: 1.25rem;
		.card-img {
			border-radius: 1.25rem;
		}
		.card-body {
			opacity: 0;
			display: flex;
			text-align: center;
			flex-direction: column;
			transition: all 0.3s ease-in;
			.btn {
				align-items: center;
				margin-top: auto;
				border-radius: 10px;
			}

			&:hover {
				opacity: 1;
				background: rgba(0, 0, 0, 0.6);
				border-radius: 1.25rem;
				.card-title {
					color: #fff;
				}
			}
		}
	}

	#detail-show {
		.title {
			.detail-title {
				font-weight: bold;
				font-size: 1.5625rem;
				margin-bottom: 0;
			}
			.detail-rilis {
				color: #b0afaf;
				font-size: 0.9375rem;
				margin-bottom: 0;
			}
		}
	}

	@media only screen and (max-device-width: 480px) {
		.card {
			.card-img {
				border-radius: 1.25rem;
			}
			.card-body {
				opacity: 1;
				background-color: rgba(0, 0, 0, 0.4);
				border-radius: 1.25rem;
				.card-title {
					color: #fff;
				}
			}
		}
	}
</style>
