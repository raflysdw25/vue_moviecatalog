<template>
	<!-- eslint-disable -->
	<div>
		<b-modal ref="my-modal" hide-footer hide-header>
			<div class="d-flex flex-column">
				<h3>Congratulations {{ playerData.name }}</h3>
				<p>
					Correct Answer :
					<span class="badge badge-success">{{ numCorrect }} </span>
				</p>
				<p>
					Incorrect Answer :
					<span class="badge badge-danger">{{ numTotal - numCorrect }} </span>
				</p>
				<h4>
					You are a {{ numCorrect > 5 ? 'movie geek' : 'movie haters' }} !
				</h4>
			</div>

			<button @click="savePlayer" class="btn btn-sm btn-primary mt-2">
				<router-link to="/quiz" class="text-white text-decoration-none">
					Back to Home
				</router-link>
			</button>
		</b-modal>
	</div>
</template>

<script>
	/* eslint-disable */
	export default {
		props: ['numCorrect', 'numTotal'],
		data() {
			return {
				playerData: {},
			}
		},
		methods: {
			showModal() {
				this.$refs['my-modal'].show()
			},
			savePlayer() {
				const { name, age, correct } = this.playerData
				const history = {
					name: name,
					age: age,
					correct: this.numCorrect,
				}

				localStorage.playerData = JSON.stringify(history)
			},
		},
		mounted() {
			this.showModal()
			if (localStorage.playerData) {
				this.playerData = JSON.parse(localStorage.playerData)
			}
		},
	}
</script>
