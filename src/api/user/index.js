/*
 * @Author: hypocrisy
 * @Date: 2021-05-27 18:58:24
 * @LastEditors: hypocrisy
 * @LastEditTime: 2021-05-27 21:28:11
 * @FilePath: /orange-admin/src/api/user/index.js
 */
/* eslint-disable */
import { get, post, getp, postp } from '../index'

export const login = data => {
	return post('/login/normal', data)
}
export const getUser = () => {
	return post('/token/admin/user/list', {
		begin: 0,
		count: 20,
		msg: '',
	})
}
