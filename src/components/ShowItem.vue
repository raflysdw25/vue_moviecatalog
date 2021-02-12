<template>
	<!-- eslint-disable -->
	<div class="show-item-container">
		<b-row v-if="sortDisplay === 0">
			<b-col lg="4" md="6" v-for="tvshow in tvshows" :key="tvshow.id">
				<b-card
					overlay
					:img-src="imagePosterUrl + tvshow.poster_path"
					:img-alt="tvshow.original_name"
					:title="tvshow.name"
					class="mb-3"
				>
					<b-button
						class="bg-main"
						@click="show(tvshow.id)"
						v-b-modal.detailModal
					>
						Lihat Detail
					</b-button>
				</b-card>
			</b-col>
		</b-row>
		<b-row v-if="sortDisplay > 0">
			<b-col
				lg="4"
				md="6"
				v-for="index in sortDisplay"
				:key="tvshows[index].id"
			>
				<b-card
					overlay
					:img-src="imagePosterUrl + tvshows[index].poster_path"
					:img-alt="tvshows[index].original_name"
					:title="tvshows[index].name"
					class="mb-3"
				>
					<b-button
						class="bg-main"
						@click="show(tvshows[index].id)"
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
					<b-col lg="5">
						<div class="title">
							<p class="detail-title">{{ this.showDetail.name }}</p>
							<p class="detail-rilis">
								{{ this.showDetail.first_air_date }}
							</p>
						</div>
						<div class="detail-genre mt-4">
							<h4>Genre</h4>
							<ol>
								<li v-for="genre in this.showDetail.genres" :key="genre.id">
									{{ genre.name }}
								</li>
							</ol>
						</div>
						<div class="detail-website mt-4">
							<h4>Website</h4>
							<a :href="this.showDetail.homepage">
								{{ this.showDetail.homepage }}
							</a>
						</div>
					</b-col>
					<b-col lg="7">
						<div class="detail-overview">
							<h4>Overview</h4>
							<p>
								{{ this.showDetail.overview }}
							</p>
						</div>
						<h4>Networks</h4>
						<b-row>
							<b-col
								cols="2"
								v-for="network in this.showDetail.networks"
								:key="network.id"
							>
								<figure>
									<img :src="imageLogoUrl + network.logo_path" alt="" />
								</figure>
							</b-col>
						</b-row>
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
			tvshows: Array,
			sortDisplay: Number,
		},
		data: function() {
			return {
				// imagePosterUrl: 'https://image.tmdb.org/t/p/w342/',
				// imageBackdropUrl: 'https://image.tmdb.org/t/p/w780/',
				// imageLogoUrl: 'https://image.tmdb.org/t/p/w45/',
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
			async show(id) {
				this.loading = true
				await this.tvShowDetail(id)
				this.loading = false
			},
			async tvShowDetail(id) {
				try {
					const response = await api.showTvDetail(id)
					console.log(response)
					this.showDetail = response.data
				} catch (error) {
					console.log(error)
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
