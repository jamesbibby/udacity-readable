import { handleAsyncResponse } from './asyncHelper'

export const GET_CATEGORIES = 'GET_CATEGORIES'

export const getCategoriesAsync = () => {
	return (dispatch, getState, api) => {
		handleAsyncResponse(
			dispatch,
			api.getCategories(),
			getCategories,
			'fetch categories'
		)
	}
}

export const getCategories = categories => {
	return {
		type: GET_CATEGORIES,
		categories,
	}
}
