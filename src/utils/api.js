import axios from 'axios'
import uuid from 'uuid/v4'

const ENDPOINT = process.env.ENDPOINT || 'http://localhost:3001'

const HEADERS = {
	Authorization: 'whatever-you-want',
	Accept: 'application/json',
	'Content-Type': 'application/json',
}

// Category functions
const getCategories = () =>
	axios({ url: `${ENDPOINT}/categories`, method: 'GET', headers: HEADERS })

// Post functions
const getPosts = () =>
	axios({ url: `${ENDPOINT}/posts`, method: 'GET', headers: HEADERS })

const addPost = (title, author, body, category) =>
	axios({
		url: `${ENDPOINT}/posts`,
		method: 'POST',
		headers: HEADERS,
		data: {
			id: uuid(),
			timestamp: Date.now(),
			title,
			body,
			author,
			category,
		},
	})

const updatePost = (postId, title, body) =>
	axios({
		url: `${ENDPOINT}/posts/${postId}`,
		method: 'PUT',
		headers: HEADERS,
		data: {
			title,
			body,
		},
	})

const deletePost = postId =>
	axios({
		url: `${ENDPOINT}/posts/${postId}`,
		method: 'DELETE',
		headers: HEADERS,
	})

const modifyPostVoteScore = (postId, modification) => {
	return modifyVoteScore(postId, modification, 'posts')
}

// Comment functions
const getComments = postId =>
	axios({
		url: `${ENDPOINT}/posts/${postId}/comments`,
		method: 'GET',
		headers: HEADERS,
	})

const addComment = (postId, body, author) =>
	axios({
		url: `${ENDPOINT}/comments`,
		method: 'POST',
		headers: HEADERS,
		data: {
			id: uuid(),
			timestamp: Date.now(),
			body,
			author,
			parentId: postId,
		},
	})

const updateComment = (commentId, body) => {
	return axios({
		url: `${ENDPOINT}/comments/${commentId}`,
		method: 'PUT',
		headers: HEADERS,
		data: {
			timestamp: Date.now(),
			body,
		},
	})
}

const deleteComment = commentId =>
	axios({
		url: `${ENDPOINT}/comments/${commentId}`,
		method: 'DELETE',
		headers: HEADERS,
	})

const modifyCommentVoteScore = (postId, modification) => {
	return modifyVoteScore(postId, modification, 'comments')
}

// Private function to consolidate voting calls
const modifyVoteScore = (id, modification, entity) => {
	return axios({
		url: `${ENDPOINT}/${entity}/${id}`,
		method: 'POST',
		headers: HEADERS,
		data: { option: modification },
	})
}

export default {
	getCategories,
	getPosts,
	addPost,
	updatePost,
	deletePost,
	modifyPostVoteScore,
	getComments,
	addComment,
	updateComment,
	deleteComment,
	modifyCommentVoteScore,
}
