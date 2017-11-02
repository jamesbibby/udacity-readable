import { combineReducers } from 'redux'
import {
	GET_CATEGORIES,
	GET_POSTS,
	ERROR_RECEIVED,
	CLEAR_ERROR,
} from '../actions'

const initialMessageBoardState = {
	growler: null,
	categories: [],
	posts: [
		{
			id: '8xf0y6ziyjabvozdd253nd',
			timestamp: 1467166872634,
			title: 'Udacity is the best place to learn React',
			body: 'Everyone says so after all.',
			author: 'thingtwo',
			category: 'react',
			voteScore: 6,
			deleted: false,
			commentCount: 2,
		},
		{
			id: '6ni6ok3ym7mf1p33lnez',
			timestamp: 1468479767190,
			title: 'Learn Redux in 10 minutes!',
			body: 'Just kidding. It takes more than 10 minutes to learn technology.',
			author: 'thingone',
			category: 'redux',
			voteScore: -5,
			deleted: false,
			commentCount: 0,
		},
	],
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
