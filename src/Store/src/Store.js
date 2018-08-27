import { createStore } from 'redux'
import composedEnhacers from './Enhancers'

const Store = createStore(() => ({}), composedEnhacers)

Store.Handlers = {}
Store.Actions = {}

export default Store
