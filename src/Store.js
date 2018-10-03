import { Store, State, Action } from 'redux-peach'
export const store = new Store()

store.configure({
  rootState: {},
  middlewares: [],
  enhancers: [],
})

export const setState = newState => State.set(newState, store)
export const findAction = actionName => Action.find(actionName, store)
export const newAction = actionName =>
  Action()
    .setName(actionName)
    .hookToStore(store)
