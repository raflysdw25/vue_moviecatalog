<template>
	<!-- eslint-disable -->
	<div class="quiz-container">
		<b-row>
			<b-col cols="12">
				<b-jumbotron v-if="showIntro" class="px-5" bg-variant="">
					<div class="overlay"></div>
					<div class="meta-wrapper">
						<h1 class="display-3">
							Welcome to Movie Quiz !
						</h1>
						<p>
							You will answer 10 questions about movie. Click Get Started to
							Begin
						</p>

						<h4>Player History</h4>
						<p>
							{{ playerData.name }} -
							<span class="badge badge-success">{{ playerData.correct }}</span>
						</p>
						<h4>How to Play :</h4>
						<ol>
							<li>Click Get Started</li>
							<li>Input your name and age, then Klik Submit</li>
							<li>Read the question, then choose your answer</li>
							<li>Klik submit, then the correct answer will show in green</li>
							<li>Klik Next to the next question. Do over step 3 until done</li>
						</ol>
						<b-button variant="primary" @click="clearForm" v-b-modal.playerForm
							>Get Started</b-button
						>
					</div>
					<b-modal
						id="playerForm"
						title="Player Data"
						hide-footer
						no-close-on-backdrop
						no-close-on-esc
						@close="clearForm"
					>
						<b-form @submit.prevent="handlePlayerData">
							<b-form-group
								id="input-group-2"
								label="Your Name :"
								label-for="input-2"
							>
								<b-form-input
									id="input-2"
									v-model="playerData.name"
									required
									type="text"
									placeholder="Enter your Name"
								></b-form-input>
							</b-form-group>

							<b-form-group
								id="input-group-2"
								label="Your Age :"
								label-for="input-2"
								description="Minimum age is 12"
							>
								<b-form-input
									id="input-2"
									v-model="playerData.age"
									required
									type="number"
									min="12"
									placeholder="Enter your Age"
								></b-form-input>
							</b-form-group>
							<b-form-group
								id="input-group-3"
								label="Difficulty :"
								label-for="input-3"
							>
								<b-form-select
									v-model="difficulty"
									:options="list_difficulty"
								></b-form-select>
							</b-form-group>
							<b-form-group
								id="input-group-4"
								label="Category :"
								label-for="input-4"
							>
								<b-form-select
									v-model="category"
									:options="list_category"
								></b-form-select>
							</b-form-group>
							<b-form-group
								id="input-group-5"
								label="Quiz Type :"
								label-for="input-5"
							>
								<b-form-select
									v-model="type"
									:options="list_type"
								></b-form-select>
							</b-form-group>

							<b-button type="submit" variant="primary" :disabled="!formFilled"
								>Submit</b-button
							>
						</b-form>
					</b-modal>
				</b-jumbotron>
			</b-col>
		</b-row>
		<b-row>
			<b-col></b-col>
			<b-col sm="4" v-if="showQuestion">
				<div v-if="numTotal < questions.length">
					<PlayerHeader :numCorrect="numCorrect" :numTotal="numTotal" />
					<QuestionBox
						v-if="questions.length"
						:currentQuestion="questions[index]"
						:next="next"
						:increment="increment"
					/>
				</div>
				<div v-if="numTotal === questions.length">
					<ModalScore :numCorrect="numCorrect" :numTotal="numTotal" />
				</div>
			</b-col>
			<b-col></b-col>
		</b-row>
	</div>
</template>

<script>
	/* eslint-disable */

	import QuestionBox from '@/components/QuestionBox.vue'
	import PlayerHeader from '@/components/PlayerHeader.vue'
	import ModalScore from '@/components/ModalScore.vue'

	import api from '@/api/api_catalog'

	export default {
		name: 'Quiz',
		components: {
			QuestionBox,
			PlayerHeader,
			ModalScore,
		},
		data() {
			return {
				questions: [],
				index: 0,
				numCorrect: 0,
				numTotal: 0,
				playerData: {
					name: '',
					age: null,
					correct: 0,
				},
				difficulty: '',
				list_difficulty: [
					{ value: '', text: 'Default Difficulty' },
					{ value: 'easy', text: 'Easy' },
					{ value: 'medium', text: 'Medium' },
					{ value: 'hard', text: 'Hard' },
				],
				category: '',
				list_category: [
					{ value: '', text: 'Any Category' },
					{ value: '11', text: 'Entertainment: Film' },
					{ value: '14', text: 'Entertainment: Television' },
					{ value: '31', text: 'Entertainment: Japanese Anime & Manga' },
					{ value: '32', text: 'Entertainment: Cartoon & Animations' },
				],
				type: '',
				list_type: [
					{
						value: '',
						text: 'Any Type',
					},
					{
						value: 'multiple',
						text: 'Multiple Choice',
					},
					{
						value: 'boolean',
						text: 'True / False',
					},
				],
				showQuestion: false,
				showIntro: true,
			}
		},
		mounted() {
			if (localStorage.playerData) {
				this.playerData = JSON.parse(localStorage.playerData)
			}
		},
		computed: {
			formFilled() {
				return (
					this.playerData.name !== '' &&
					this.playerData.age !== 0 &&
					this.playerData.age >= 12
				)
			},
		},
		methods: {
			next() {
				this.index++
			},
			increment(isCorrect) {
				if (isCorrect) {
					this.numCorrect++
				}
				this.numTotal++
			},
			async loadFilmTrivia() {
				try {
					if (this.category === '') {
						let randomCategory = this.list_category.slice(
							1,
							this.list_category.length - 1
						)
						let item =
							randomCategory[Math.floor(Math.random() * randomCategory.length)]
						this.category = item.value
					}
					const response = await api.showQuiz(
						this.category,
						this.type,
						this.difficulty
					)
					this.questions = response.data.results
					this.showQuestion = true
					this.showIntro = false
				} catch (error) {
					alert(error)
				}
			},
			async handlePlayerData() {
				await this.loadFilmTrivia()
				localStorage.playerData = JSON.stringify(this.playerData)
				this.playerData = {
					name: '',
					age: 0,
					correct: 0,
				}
			},
			clearForm() {
				this.playerData = {
					name: '',
					age: 0,
					correct: 0,
				}
			},
		},
	}
</script>

<style lang="scss" scoped>
	.jumbotron {
		position: relative;
		background-image: url('https://images.unsplash.com/photo-1518298029706-560c6e24adc7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1489&q=80');
		background-size: cover;
		background-repeat: no-repeat;
		color: #fff;
		border-radius: 0;
		margin-bottom: 0;
		height: 812px;

		h1 {
			font-size: 3.5rem;
		}

		.meta-wrapper {
			position: relative;
			z-index: 2;
		}
	}

	.jumbotron > .overlay {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 1;
	}
	@media only screen and (max-device-width: 480px) {
		.jumbotron {
			display: flex;
			align-items: center;
			h1 {
				font-size: 2.5rem;
			}
		}
	}
</style>
