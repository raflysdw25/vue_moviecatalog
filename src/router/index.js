/* eslint-disable */
import Vue from 'vue'
import VueRouter from 'vue-router'
import TvShow from '@/views/TvShow.vue'
import Quiz from '@/views/Quiz.vue'
import Movie from '@/views/Movie.vue'
import Homepage from '@/views/Homepage.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'Homepage',
		component: Homepage,
	},
	{
		path: '/tvshow',
		name: 'TvShow',
		component: TvShow,
	},
	{
		path: '/quiz',
		name: 'Quiz',
		component: Quiz,
	},
	{
		path: '/movies',
		name: 'Movie',
		component: Movie,
	},
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
	linkActiveClass: 'active',
})

export default router
