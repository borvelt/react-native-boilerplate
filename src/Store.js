import { Store, State, Action } from 'redux-peach'
import { composeWithDevTools } from 'remote-redux-devtools'
let debuggWrapper = data => data
if (__DEV__ === 'NOT_READY') {
  debuggWrapper = composeWithDevTools({
    realtime: true,
    port: 8000,
  })
}

export const store = new Store()

store.configure({
  rootState: {},
  middlewares: [],
  enhancers: [],
  composeEnhancer: debuggWrapper,
})

export const setState = newState => State.set(newState, store)
export const findAction = actionName => Action.find(actionName, store)
export const newAction = actionName =>
  Action()
    .setName(actionName)
    .hookToStore(store)
