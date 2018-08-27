import {
  applyMiddleware,
  compose,
} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {
  composeWithDevTools,
} from 'remote-redux-devtools'

let debuggWrapper = data => data
let middlewares = [thunkMiddleware]
if (__DEV__ === true) {
  debuggWrapper = composeWithDevTools({
    realtime: true,
    port: 8000,
  })
}
let enhancers = []

export default debuggWrapper(compose(
  applyMiddleware(...middlewares), ...enhancers))