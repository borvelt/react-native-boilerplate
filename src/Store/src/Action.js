import React from 'react'
import ActionCreator from './ActionCreator'
import ActionHandler from './ActionHandler'
import Store from './Store'
import ActionSelector from './ActionSelector'

class Action extends React.Component {
  constructor(props) {
    super(props)
    new ActionCreator(props)
    new ActionHandler(props)
    this._autoDispatch(props)
  }

  render() {
    return null
  }

  _autoDispatch() {
    if (this.props.selfDispatch) {
      Store.dispatch(ActionSelector(this.props.name)(this.props.onDispatchArgs))
    }
  }
}

export default Action
