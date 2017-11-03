export const GET_CATEGORIES = 'GET_CATEGORIES'
export const GET_POSTS = 'GET_POSTS'
export const UPDATE_POST_VOTESCORE = 'UPDATE_POST_VOTESCORE'
export const UPDATE_COMMENT_VOTESCORE = 'UPDATE_COMMENT_VOTESCORE'
export const UPDATE_COMMENTS = 'UPDATE_COMMENTS'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const UPDATE_COMMENT = 'UPDATE_COMMENT'
export const ADD_COMMENT = 'ADD_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const ERROR_RECEIVED = 'ERROR_RECEIVED'
export const CLEAR_ERROR = 'CLEAR_ERROR'

export const getCommentsAsync = postId => {
	return (dispatch, getState, api) => {
		api.getComments(postId).then(
			response => {
				if (response.status === 200 && response.data) {
					dispatch(updateComments(postId, response.data))
					return
				}
				dispatch(
					errorReceived(
						`Unable to fetch comments for post with id [${postId}]  (code: ${response.status}, message: ${response.statusText})`
					)
				)
				setTimeout(() => dispatch(clearError()), 5000)
			},
			error => {
				dispatch(
					errorReceived(
						`Unable to fetch comments for post with id [${postId}] (message: ${error.message})`
					)
				)
			}
		)
	}
}

export const saveCommentAsync = (postId, commentId, body) => {
	return (dispatch, getState, api) => {
		api.updateComment(commentId, body).then(
			response => {
				if (response.status === 200 && response.data) {
					dispatch(updateComment(postId, response.data))
					return
				}
				dispatch(
					errorReceived(
						`Unable to save comment with id [${commentId}] for post with id [${postId}]  (code: ${response.status}, message: ${response.statusText})`
					)
				)
				setTimeout(() => dispatch(clearError()), 5000)
			},
			error => {
				dispatch(
					errorReceived(
						`Unable to save comment with id [${commentId}] for post with id [${postId}] (message: ${error.message})`
					)
				)
			}
		)
	}
}

export const addCommentAsync = (postId, body, author) => {
	return (dispatch, getState, api) => {
		api.addComment(postId, body, author).then(
			response => {
				if (response.status === 200 && response.data) {
					dispatch(addComment(postId, response.data))
					return
				}
				dispatch(
					errorReceived(
						`Unable to add comment for post with id [${postId}]  (code: ${response.status}, message: ${response.statusText})`
					)
				)
				setTimeout(() => dispatch(clearError()), 5000)
			},
			error => {
				dispatch(
					errorReceived(
						`Unable to add comment for post with id [${postId}] (message: ${error.message})`
					)
				)
			}
		)
	}
}

export const deleteCommentAsync = (postId, commentId) => {
	return (dispatch, getState, api) => {
		api.deleteComment(commentId).then(
			response => {
				if (response.status === 200 && response.data) {
					dispatch(deleteComment(postId, commentId))
					return
				}
				dispatch(
					errorReceived(
						`Unable to delete comment for with id [${commentId}] for post [${postId}] (code: ${response.status}, message: ${response.statusText})`
					)
				)
				setTimeout(() => dispatch(clearError()), 5000)
			},
			error => {
				dispatch(
					errorReceived(
						`Unable to delete comment for with id [${commentId}] for post [${postId}]  (message: ${error.message})`
					)
				)
			}
		)
	}
}

export const modifyPostVoteScoreAsync = (postId, modification) => {
	return (dispatch, getState, api) => {
		api.modifyPostVoteScore(postId, modification).then(
			response => {
				if (response.status === 200 && response.data) {
					dispatch(updatePostVoteScore(response.data))
					return
				}
				dispatch(
					errorReceived(
						`Unable to modify post score (code: ${response.status}, message: ${response.statusText})`
					)
				)
				setTimeout(() => dispatch(clearError()), 5000)
			},
			error => {
				dispatch(
					errorReceived(
						`Unable to modify post score (message: ${error.message})`
					)
				)
			}
		)
	}
}

export const modifyCommentVoteScoreAsync = (
	postId,
	commentId,
	modification
) => {
	return (dispatch, getState, api) => {
		api.modifyCommentVoteScore(commentId, modification).then(
			response => {
				if (response.status === 200 && response.data) {
					dispatch(updateCommentVoteScore(postId, response.data))
					return
				}
				dispatch(
					errorReceived(
						`Unable to modify comment score (code: ${response.status}, message: ${response.statusText})`
					)
				)
				setTimeout(() => dispatch(clearError()), 5000)
			},
			error => {
				dispatch(
					errorReceived(
						`Unable to modify comment score (message: ${error.message})`
					)
				)
			}
		)
	}
}

export const getCategoriesAsync = () => {
	return (dispatch, getState, api) => {
		api.getCategories().then(
			response => {
				if (response.status === 200 && response.data) {
					dispatch(getCategories(response.data.categories))
					return
				}
				dispatch(
					errorReceived(
						`Unable to fetch categories (code: ${response.status}, message: ${response.statusText})`
					)
				)
				setTimeout(() => dispatch(clearError()), 5000)
			},
			error => {
				console.log(error)
				dispatch(
					errorReceived(
						`Unable to fetch categories (message: ${error.message})`
					)
				)
			}
		)
	}
}

export const getPostsAsync = () => {
	return (dispatch, getState, api) => {
		api.getPosts().then(
			response => {
				if (response.status === 200 && response.data) {
					dispatch(getPosts(response.data))
					return
				}
				dispatch(
					errorReceived(
						`Unable to fetch posts (code: ${response.status}, message: ${response.statusText})`
					)
				)
				setTimeout(() => dispatch(clearError()), 5000)
			},
			error => {
				dispatch(
					errorReceived(`Unable to fetch posts (message: ${error.message})`)
				)
			}
		)
	}
}

export const updateComments = (postId, comments) => {
	return {
		type: UPDATE_COMMENTS,
		postId,
		comments,
	}
}

export const editComment = (postId, commentId) => {
	return {
		type: EDIT_COMMENT,
		postId,
		commentId,
	}
}

export const updateComment = (postId, comment) => {
	return {
		type: UPDATE_COMMENT,
		postId,
		comment,
	}
}

export const addComment = (postId, comment) => {
	return {
		type: ADD_COMMENT,
		postId,
		comment,
	}
}

export const deleteComment = (postId, commentId) => {
	return {
		type: DELETE_COMMENT,
		postId,
		commentId,
	}
}

export const updatePostVoteScore = post => {
	return {
		type: UPDATE_POST_VOTESCORE,
		post,
	}
}

export const updateCommentVoteScore = (postId, comment) => {
	return {
		type: UPDATE_COMMENT_VOTESCORE,
		postId,
		comment,
	}
}

export const getCategories = categories => {
	return {
		type: GET_CATEGORIES,
		categories,
	}
}

export const getPosts = posts => {
	return {
		type: GET_POSTS,
		posts,
	}
}

export const errorReceived = message => {
	return {
		type: ERROR_RECEIVED,
		message,
	}
}

export const clearError = message => {
	return {
		type: CLEAR_ERROR,
	}
}
