/* eslint-disable prettier/prettier */
/*
 * @Author: hypocrisy
 * @Date: 2021-05-27 16:58:12
 * @LastEditors: hypocrisy
 * @LastEditTime: 2021-05-28 22:54:54
 * @FilePath: /orange-admin/src/router/index.js
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'Login',
		component: () =>
			import(/* webpackChunkName: "login" */ 'views/login'),
	},
	{
		path: '/home',
		name: 'Home',
		component: () =>
			import(/* webpackChunkName: "home" */ 'views/home'),
		redirect: '/news',
		children: [
			{
				path: '/news',
				component: () =>
					import(/* webpackChunkName: "news" */ 'views/news'),
			},
			{
				path: '/write',
				component: () =>
					import(/* webpackChunkName: "write" */ 'views/write'),
			},
			{
				path: '/user',
				component: () =>
					import(/* webpackChunkName: "user" */ 'views/user'),
			},
			{
				path: '/addnews',
				component: () =>
					import(/* webpackChunkName: "add" */ 'views/addnews'),
			},
			{
				path: '/models',
				component: () =>
					import(/* webpackChunkName: "models" */ 'views/model'),
			},
			{
				path: '/comments',
				component: () =>
					import(/* webpackChunkName: "comments" */ 'views/comment'),
			},
		],
	},
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
})
router.beforeEach((to, from, next) => {
	if (to.path === '/') return next()
	if (!localStorage.getItem('token')) next('/')
	next()
})
export default router
