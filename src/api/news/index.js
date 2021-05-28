/*
 * @Author: hypocrisy
 * @Date: 2021-05-27 19:03:15
 * @LastEditors: hypocrisy
 * @LastEditTime: 2021-05-28 23:44:28
 * @FilePath: /orange-admin/src/api/news/index.js
 */
/* eslint-disable */
import { get, post, getp, postp } from '../index'

export const getNewsBySearch = data => {
	return post('/search', data)
}
export const getRandNews = () => {
	return get('/rand')
}
export const getNewsById = index => {
	return get(`/token/news/${index}`)
}
export const getModelNews = index => {
	return get(`select/news/${index}`, { begin: 0, count: 10 })
}
export const updateNews = data => {
	return post('/token/admin/news/update', data)
}
export const deleteNews = index => {
	return post(`/token/admin/news/delete/${index}`)
}
export const getNewsPlate = () => {
	return get('select/model')
}
export const addPlate = data => {
	return post('/token/admin/model/insert', data)
}
export const removePlate = index => {
	return post(`/token/admin/model/delete/${index}`)
}
export const updatePlate = data => {
	return post(`/token/admin/model/update`, data)
}
export const getReportComment = () => {
	return post('/token/admin/comment/list', { begin: 0, count: 20 })
}
export const deleteReportComment = index => {
	return post(`/token/comment/delete/${index}`)
}
export const cancelReportComment = index => {
	return post(`/token/admin/comment/cancel/${index}`)
}
export const uploadPhoto = data => {
	return postp('/token/file/upload/picture', data)
}
export const uploadHtml = data => {
	return postp('/token/file/upload/html', data)
}
export const uploadNews = data => {
	return post('/token/admin/news/insert', data)
}
