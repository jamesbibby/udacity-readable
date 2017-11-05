import { combineReducers } from 'redux'
import {
	GET_CATEGORIES,
	GET_POSTS,
	UPDATE_POST_VOTESCORE,
	UPDATE_COMMENT_VOTESCORE,
	UPDATE_COMMENTS,
	DELETE_COMMENT,
	ERROR_RECEIVED,
	CLEAR_ERROR,
	EDIT_COMMENT,
	UPDATE_COMMENT,
	ADD_COMMENT,
	ADD_POST,
} from '../actions'

const initialMessageBoardState = {
	growler: null,
	categories: [],
	posts: [],
	comments: {},
}

const messageBoard = (state = initialMessageBoardState, action) => {
	switch (action.type) {
		case GET_CATEGORIES:
			return {
				...state,
				categories: action.categories,
			}
		case GET_POSTS:
			return {
				...state,
				posts: action.posts,
			}
		case UPDATE_COMMENTS:
			return {
				...state,
				comments: { ...state.comments, [action.postId]: action.comments },
			}
		case EDIT_COMMENT:
			return {
				...state,
				comments: {
					...state.comments,
					[action.postId]: state.comments[action.postId].map(
						comment =>
							comment.id === action.commentId
								? { ...comment, editing: true }
								: comment
					),
				},
			}
		case ADD_COMMENT:
			return {
				...state,
				comments: {
					...state.comments,
					[action.postId]: [...state.comments[action.postId], action.comment],
				},
			}
		case ADD_POST:
			return {
				...state,
				posts: [...state.posts, action.post],
			}
		case UPDATE_COMMENT:
			return {
				...state,
				comments: {
					...state.comments,
					[action.postId]: state.comments[action.postId].map(
						comment =>
							comment.id === action.comment.id ? action.comment : comment
					),
				},
			}
		case DELETE_COMMENT:
			return {
				...state,
				comments: {
					...state.comments,
					[action.postId]: state.comments[action.postId].filter(
						comment => comment.id !== action.commentId
					),
				},
			}
		case UPDATE_POST_VOTESCORE:
			return {
				...state,
				posts: state.posts.map(
					post =>
						action.post.id === post.id
							? { ...post, voteScore: action.post.voteScore }
							: post
				),
			}
		case UPDATE_COMMENT_VOTESCORE:
			return {
				...state,
				comments: {
					...state.comments,
					[action.postId]: state.comments[action.postId].map(
						comment =>
							comment.id === action.comment.id ? action.comment : comment
					),
				},
			}
		case ERROR_RECEIVED:
			return {
				...state,
				errorMessage: action.message,
			}
		case CLEAR_ERROR:
			return {
				...state,
				errorMessage: '',
			}
		default:
			return state
	}
}

export default combineReducers({ messageBoard })
