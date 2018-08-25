import React from 'react'
import {
  DEFAULT_STATE_SET,
} from '../../Constants'
import Action from './Action'

class DefaultStates extends React.Component {
  constructor(props) {
    super(props)
    new Action({
      selfDispatch: true,
      name: DEFAULT_STATE_SET,
      onDispatchArgs: props,
      onSucceed: action => action.payload,
    })
  }

  render() {
    return null
  }

}

export default DefaultStates