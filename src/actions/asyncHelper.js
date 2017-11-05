import { errorReceived, clearError, createError } from './errors'

export const handleAsyncResponse = (
	dispatch,
	response,
	successFunc,
	actionDescription
) => {
	let error
	response.then(
		response => {
			if (response.status === 200 && response.data) {
				dispatch(successFunc(response.data))
				return
			}
			error = createError(
				`Unable to ${actionDescription} (code: ${response.status}, message: ${response.statusText})`
			)
			dispatch(errorReceived(error))
			setTimeout(() => dispatch(clearError(error)), 5000)
		},
		error => {
			error = createError(
				`Unable to ${actionDescription} (message: ${error.message})`
			)
			dispatch(errorReceived(error))
			setTimeout(() => dispatch(clearError(error)), 5000)
		}
	)
}
