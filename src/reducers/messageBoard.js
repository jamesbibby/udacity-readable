import {
	GET_CATEGORIES,
	GET_POSTS,
	ADD_POST,
	UPDATE_POST,
	DELETE_POST,
	UPDATE_POST_VOTESCORE,
	GET_COMMENTS,
	EDIT_COMMENT,
	ADD_COMMENT,
	UPDATE_COMMENT,
	DELETE_COMMENT,
	UPDATE_COMMENT_VOTESCORE,
} from '../actions'

const initialMessageBoardState = {
	categories: [],
	posts: [],
	comments: {},
}

export const messageBoard = (state = initialMessageBoardState, action) => {
	switch (action.type) {
		case GET_CATEGORIES:
			return {
				...state,
				categories: action.categories.categories,
			}
		case GET_POSTS:
			return {
				...state,
				posts: action.posts,
			}

		case ADD_POST:
			return {
				...state,
				posts: [...state.posts, action.post],
			}
		case UPDATE_POST:
			return {
				...state,
				posts: state.posts.map(
					post => (post.id === action.post.id ? action.post : post)
				),
			}
		case DELETE_POST:
			return {
				...state,
				posts: state.posts.filter(post => post.id !== action.post.id),
				comments: { ...state.comments, [action.post.id]: [] },
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
		case GET_COMMENTS:
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
								? { ...comment, editing: action.editing }
								: comment
					),
				},
			}
		case ADD_COMMENT:
			return {
				...state,
				posts: state.posts.map(
					post =>
						action.comment.parentId === post.id
							? { ...post, commentCount: post.commentCount + 1 }
							: post
				),
				comments: {
					...state.comments,
					[action.comment.parentId]: [
						...state.comments[action.comment.parentId],
						action.comment,
					],
				},
			}
		case UPDATE_COMMENT:
			return {
				...state,
				comments: {
					...state.comments,
					[action.comment.parentId]: state.comments[
						action.comment.parentId
					].map(
						comment =>
							comment.id === action.comment.id ? action.comment : comment
					),
				},
			}
		case DELETE_COMMENT:
			return {
				...state,
				posts: state.posts.map(post => ({
					...post,
					commentCount:
						post.id === action.postId
							? post.commentCount - 1
							: post.commentCount,
				})),
				comments: {
					...state.comments,
					[action.postId]: state.comments[action.postId].filter(
						comment => comment.id !== action.commentId
					),
				},
			}
		case UPDATE_COMMENT_VOTESCORE:
			return {
				...state,
				comments: {
					...state.comments,
					[action.comment.parentId]: state.comments[
						action.comment.parentId
					].map(
						comment =>
							comment.id === action.comment.id ? action.comment : comment
					),
				},
			}
		default:
			return state
	}
}
