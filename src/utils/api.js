const ENDPOINT = process.env.ENDPOINT || 'http://localhost5001'

const HEADERS = { Authorization: 'whatever-you-want' }

export function getCategories() {
	return fetch({
		url: `${ENDPOINT}/categories`,
		method: 'GET',
		headers: HEADERS,
	})
		.then(res => res.json())
		.then(({ categories }) => categories.map(({ catogory }) => category))
}
