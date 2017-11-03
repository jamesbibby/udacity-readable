import axios from 'axios'
import uuid from 'uuid/v4'

const ENDPOINT = process.env.ENDPOINT || 'http://localhost:3001'

const HEADERS = {
	Authorization: 'whatever-you-want',
	Accept: 'application/json',
	'Content-Type': 'application/json',
}

const modifyPostVoteScore = (postId, modification) => {
	return modifyVoteScore(postId, modification, 'posts')
}

const modifyCommentVoteScore = (postId, modification) => {
	return modifyVoteScore(postId, modification, 'comments')
}

const modifyVoteScore = (id, modification, entity) => {
	return axios({
		url: `${ENDPOINT}/${entity}/${id}`,
		method: 'POST',
		headers: HEADERS,
		data: { option: modification },
	})
}

const deleteComment = commentId =>
	axios({
		url: `${ENDPOINT}/comments/${commentId}`,
		method: 'DELETE',
		headers: HEADERS,
	})

const updateComment = (commentId, body) => {
	console.log(commentId, body)
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

const getComments = postId =>
	axios({
		url: `${ENDPOINT}/posts/${postId}/comments`,
		method: 'GET',
		headers: HEADERS,
	})

const getCategories = () =>
	axios({ url: `${ENDPOINT}/categories`, method: 'GET', headers: HEADERS })

const getPosts = () =>
	axios({ url: `${ENDPOINT}/posts`, method: 'GET', headers: HEADERS })

export default {
	modifyPostVoteScore,
	modifyCommentVoteScore,
	getCategories,
	getPosts,
	getComments,
	deleteComment,
	updateComment,
	addComment,
}
