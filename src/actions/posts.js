import { handleAsyncResponse } from './asyncHelper'

export const GET_POSTS = 'GET_POSTS'
export const ADD_POST = 'ADD_POST'
export const UPDATE_POST = 'UPDATE_POST'
export const DELETE_POST = 'DELETE_POST'
export const UPDATE_POST_VOTESCORE = 'UPDATE_POST_VOTESCORE'

export const getPostsAsync = () => {
	return (dispatch, getState, api) => {
		handleAsyncResponse(dispatch, api.getPosts(), getPosts, 'fetch posts')
	}
}

export const addPostAsync = (title, author, body, category) => {
	return (dispatch, getState, api) => {
		handleAsyncResponse(
			dispatch,
			api.addPost(title, author, body, category),
			addPost,
			'add post'
		)
	}
}

export const deletePostAsync = postId => {
	return (dispatch, getState, api) => {
		handleAsyncResponse(
			dispatch,
			api.deletePost(postId),
			deletePost,
			'delete post'
		)
	}
}

export const updatePostAsync = (postId, title, body) => {
	return (dispatch, getState, api) => {
		handleAsyncResponse(
			dispatch,
			api.updatePost(postId, title, body),
			updatePost,
			'update post'
		)
	}
}

export const modifyPostVoteScoreAsync = (postId, modification) => {
	return (dispatch, getState, api) => {
		handleAsyncResponse(
			dispatch,
			api.modifyPostVoteScore(postId, modification),
			updatePostVoteScore,
			`modify post score with id ${postId}`
		)
	}
}

export const addPost = post => {
	return {
		type: ADD_POST,
		post,
	}
}

export const deletePost = post => {
	return {
		type: DELETE_POST,
		post,
	}
}

export const updatePost = post => {
	return {
		type: UPDATE_POST,
		post,
	}
}

export const updatePostVoteScore = post => {
	return {
		type: UPDATE_POST_VOTESCORE,
		post,
	}
}

export const getPosts = posts => {
	return {
		type: GET_POSTS,
		posts,
	}
}
