import { Store, State, Action } from 'redux-peach'
import { createLogger } from 'redux-logger'

export const store = new Store()

store.configure({
  rootState: {},
  middlewares: [
    createLogger({
      stateTransformer: state => state.toImmutableObject().toJS(),
    }),
  ],
  enhancers: [],
})

export const setState = newState => State.set(newState, store)
export const findAction = actionName => Action.find(actionName, store)
export const newAction = actionName =>
  new Action().setName(actionName).hookToStore(store)
