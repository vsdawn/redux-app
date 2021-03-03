import { combineReducers, createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger'

import { createEditEventReducer } from './createEditEventStore.js'

const rootReducer = combineReducers({
    createEditEventReducer,
})

const store = createStore(rootReducer, applyMiddleware(logger))


export default store