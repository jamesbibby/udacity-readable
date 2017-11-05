import { ERROR_RECEIVED, CLEAR_ERROR, CLEAR_ALL_ERRORS } from '../actions'

const initialErrorsState = {
	growler: null,
	errors: [],
}

export const errors = (state = initialErrorsState, action) => {
	switch (action.type) {
		case ERROR_RECEIVED:
			return {
				...state,
				errors: [...state.errors, action.error],
			}
		case CLEAR_ERROR:
			return {
				...state,
				errors: state.errors.filter(error => error.id !== action.error.id),
			}
		case CLEAR_ALL_ERRORS:
			return {
				...state,
				errors: [],
			}
		default:
			return state
	}
}
