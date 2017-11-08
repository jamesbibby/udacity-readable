import { handleAsyncResponse } from './asyncHelper'

export const GET_COMMENTS = 'GET_COMMENTS'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const ADD_COMMENT = 'ADD_COMMENT'
export const UPDATE_COMMENT = 'UPDATE_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const UPDATE_COMMENT_VOTESCORE = 'UPDATE_COMMENT_VOTESCORE'

export const getCommentsAsync = postId => {
	return (dispatch, getState, api) => {
		handleAsyncResponse(
			dispatch,
			api.getComments(postId),
			response => getComments(postId, response),
			`fetch comments for post with id [${postId}]`
		)
	}
}

export const addCommentAsync = (postId, body, author) => {
	return (dispatch, getState, api) => {
		handleAsyncResponse(
			dispatch,
			api.addComment(postId, body, author),
			addComment,
			`add comment for post with id [${postId}]`
		)
	}
}

export const saveCommentAsync = (postId, commentId, body) => {
	return (dispatch, getState, api) => {
		handleAsyncResponse(
			dispatch,
			api.updateComment(commentId, body),
			updateComment,
			`save comment with id [${commentId}] for post with id [${postId}]`
		)
	}
}

export const deleteCommentAsync = (postId, commentId) => {
	return (dispatch, getState, api) => {
		handleAsyncResponse(
			dispatch,
			api.deleteComment(commentId),
			response => deleteComment(postId, response),
			`Unable to delete comment for with id [${commentId}] for post [${postId}]`
		)
	}
}

export const modifyCommentVoteScoreAsync = (
	postId,
	commentId,
	modification
) => {
	return (dispatch, getState, api) => {
		handleAsyncResponse(
			dispatch,
			api.modifyCommentVoteScore(commentId, modification),
			updateCommentVoteScore,
			`modify comment score for post with id [${postId}] and comment with id [${commentId}]`
		)
	}
}

export const getComments = (postId, comments) => {
	return {
		type: GET_COMMENTS,
		postId,
		comments,
	}
}

export const editComment = (postId, commentId, editing) => {
	return {
		type: EDIT_COMMENT,
		postId,
		commentId,
		editing,
	}
}

export const addComment = comment => {
	return {
		type: ADD_COMMENT,
		comment,
	}
}

export const updateComment = comment => {
	return {
		type: UPDATE_COMMENT,
		comment,
	}
}

export const deleteComment = (postId, comment) => {
	return {
		type: DELETE_COMMENT,
		postId,
		commentId: comment.id,
	}
}

export const updateCommentVoteScore = comment => {
	return {
		type: UPDATE_COMMENT_VOTESCORE,
		comment,
	}
}
