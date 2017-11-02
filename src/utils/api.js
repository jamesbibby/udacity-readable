const ENDPOINT = process.env.ENDPOINT || 'http://localhost:3001'

const HEADERS = { Authorization: 'whatever-you-want' }

const getCategories = () => {
	return fetch(`${ENDPOINT}/categoriess`, {
		method: 'GET',
		headers: HEADERS,
	})
}

export default {
	getCategories,
}
