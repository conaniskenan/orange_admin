/*
 * @Author: hypocrisy
 * @Date: 2021-05-27 17:18:52
 * @LastEditors: hypocrisy
 * @LastEditTime: 2021-05-27 17:33:34
 * @FilePath: /orange-admin/vue.config.js
 */
/* eslint-disable */
const path = require('path')
const resolve = dir => path.resolve(__dirname, dir)
module.exports = {
	configureWebpack: {
		resolve: {
			alias: {
				'@': resolve('src'),
				components: resolve('src/components'),
				assets: resolve('src/assets'),
				views: resolve('src/views'),
			},
			extensions: ['.vue', '.js', '.jsx', '.ts', '.tsx'],
		},
	},
}
