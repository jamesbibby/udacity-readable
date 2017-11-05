import { combineReducers } from 'redux'
import { errors } from './errors'
import { messageBoard } from './messageBoard'

export default combineReducers({ messageBoard, errors })
