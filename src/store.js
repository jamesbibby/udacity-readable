import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'
import api from './utils/api'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const middleware = []

if (process.env.NODE_ENV === `development`) {
	const { logger } = require(`redux-logger`)
	middleware.push(logger)
}
middleware.push(thunk.withExtraArgument(api))

const store = createStore(
	rootReducer,
	composeEnhancers(applyMiddleware(...middleware))
)

export default store
