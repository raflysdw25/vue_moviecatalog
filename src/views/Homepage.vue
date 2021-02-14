<template>
	<!-- eslint-disable -->
	<div class="homepage-view">
		<div class="banner-homepage">
			<img src="@/assets/image/banner.png" alt="Banner App" />
			<div class="group d-flex">
				<div class="button-group mt-4 mx-auto">
					<router-link to="/tvshow">
						<button class="btn-page">
							<b-icon icon="tv"></b-icon> TV Show
						</button>
					</router-link>
					<router-link to="/movies">
						<button class="btn-page">
							<b-icon icon="film"></b-icon> Movies
						</button>
					</router-link>
					<router-link to="/quiz">
						<button class="btn-page">
							<b-icon icon="question-circle-fill"></b-icon> Quiz
						</button>
					</router-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	/* eslint-disable */
	export default {
		name: 'homepage-view',
		data() {
			return {}
		},
	}
</script>

<style lang="scss" scoped>
	.homepage-view {
		background: linear-gradient(
			90deg,
			#ff4b23 0%,
			#fe951b 43.75%,
			#fcd50b 100%
		);
		background-size: cover;
		height: 100vh;
		width: 100vw;
		display: flex;
		.banner-homepage {
			margin: auto;
			img {
				height: 200px;
			}

			.button-group {
				.btn-page {
					padding: 15px 35px;
					border: none;
					border-radius: 10px;
					background: transparent;
					color: #fff;
					font-size: 18px;
					&:hover {
						background: #f9f8f8;
						color: #070707;
						font-weight: bold;
					}
					&:focus {
						outline: none;
					}
				}
			}
		}
	}
	@media only screen and (max-device-width: 480px) {
		.homepage-view {
			overflow-y: none;
			.banner-homepage {
				padding: 0 20px;
				img {
					height: 120px;
				}
				.button-group {
					.btn-page {
						padding: 10px;
					}
				}
			}
		}
	}
</style>
