const ENDPOINT = process.env.ENDPOINT || 'http://localhost:3001'

const HEADERS = { Authorization: 'whatever-you-want' }

const getCategories = () => {
	return fetch(`${ENDPOINT}/categories`, {
		method: 'GET',
		headers: HEADERS,
	})
}

const getPosts = () => {
	return fetch(`${ENDPOINT}/posts`, {
		method: 'GET',
		headers: HEADERS,
	})
}

export default {
	getCategories,
	getPosts,
}
