export const GET_CATEGORIES = 'GET_CATEGORIES'
export const ERROR_RECEIVED = 'ERROR_RECEIVED'
export const CLEAR_ERROR = 'CLEAR_ERROR'

export const getCategoriesAsync = () => {
	return (dispatch, getState, api) => {
		api.getCategories().then(
			response => {
				console.log(response)
				if (!response.ok) {
					dispatch(
						errorReceived(
							`Unable to fetch categories (code: ${response.status}, message: ${response.statusText})`
						)
					)
					setTimeout(() => dispatch(clearError()), 5000)
					return
				}
				response.json().then(json => dispatch(getCategories(json.categories)))
			},
			error => {
				dispatch(
					errorReceived(
						`Unable to fetch categories (message: ${error.message})`
					)
				)
			}
		)
	}
}

export const getCategories = categories => {
	return {
		type: GET_CATEGORIES,
		categories,
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
