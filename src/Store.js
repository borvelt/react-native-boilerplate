import storeInstance from 'redux-peach'

storeInstance.configure({
  rootState: { test: 10 },
  middlewares: [],
  enhancers: [],
})

export const store = storeInstance
export const Actions = storeInstance.actions
export const setState = state => (storeInstance.state = state)
export const States = store.state
