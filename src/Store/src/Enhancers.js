import {
  applyMiddleware,
  compose,
} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {
  createLogger,
} from 'redux-logger'

let middlewares = [thunkMiddleware]
if (__DEV__ === true) {
  middlewares.push(createLogger({}))
}
let enhancers = []

export default compose(
  applyMiddleware(...middlewares),
  ...enhancers
)