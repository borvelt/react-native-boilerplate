import { createStore, compose, applyMiddleware } from 'redux'
import { Store, State, Action } from 'redux-peach'
const reduxThunk = require('redux-thunk').default
const reduxStore = createStore(
  () => new State({}),
  compose(
    applyMiddleware(
      ...[reduxThunk /*and other middlewares*/],
      ...[
        /*enhancers*/
      ],
    ),
  ),
)
export const store = new Store(reduxStore)
export const setState = newState => State.set(newState, store)
export const findAction = actionName => Action.find(actionName, store)
export const newAction = actionName =>
  Action()
    .setName(actionName)
    .hookToStore(store)
