import uuid from 'uuid/v4'

export const CLEAR_ERROR = 'CLEAR_ERROR'
export const ERROR_RECEIVED = 'ERROR_RECEIVED'
export const CLEAR_ALL_ERRORS = 'CLEAR_ALL_ERRORS'

export const createError = message => {
	return {
		id: uuid(),
		message,
	}
}

export const clearAllErrors = () => {
	return {
		type: CLEAR_ALL_ERRORS,
	}
}
export const errorReceived = error => {
	return {
		type: ERROR_RECEIVED,
		error,
	}
}

export const clearError = error => {
	return {
		type: CLEAR_ERROR,
		error,
	}
}
