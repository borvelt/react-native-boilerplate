import React from 'react'
import merge from 'lodash/mergeWith'
import PropTypes from 'prop-types'
import {
  handleActions,
} from 'redux-actions'
import Store from './Store'
import ActionSelector from './ActionSelector'
import {
  DEFAULT_ACTION_LISTENER,
} from './../../Constants'
import {
  mergeCustomizer,
} from '../../Utils'

const _ActionHandler = handler => {
  Object.keys(handler).map(key => {
    if (key in Store.Handlers) {
      const func1 = Store.Handlers[key]
      const func2 = handler[key]
      Store.Handlers[key] = (state, action) => {
        let func1Result = func1(state, action)
        let func2Result = func2(func1Result, action)
        return merge({}, func1Result, merge({}, state, func2Result))
      }
      handler = {}
    }
  })
  const handlers = merge(Store.Handlers, handler)
  Store.replaceReducer(handleActions(handlers, {}))
}

class ActionHandler extends React.Component {
  listeners = ['onStarted', 'onSucceed', 'onFailed', 'onEnded']
  constructor(props) {
    super(props)
    if ('actionName' in this.props) {
      this._setHandler(this.props.actionName, this.props.onHappening)
    } else {
      if (this.listeners.find(element => (element in this.props))) {
        this._getListener()
      } else {
        this._setHandler(this._getActionName(this.props.name), this.props.onHappening)
      }
    }
  }

  _getListener() {
    for (let i in this.listeners) {
      let listener = this.listeners[i]
      if (listener in this.props) {
        let on = listener.replace('on', '').toUpperCase()
        let actionName = this._getActionName(this.props.name, on)
        this._setHandler(actionName, this.props[listener])
      }
    }
  }

  _getActionName(name, on = DEFAULT_ACTION_LISTENER) {
    return ('actionName' in this.props) ?
      this.props.actionName : ActionSelector(name)[on]
  }

  _setHandler(selectedAction, onHappening = () => {}) {
    _ActionHandler({
      [selectedAction]: (state, action) => (merge({}, state, onHappening(action, state), mergeCustomizer)),
    })
  }

  render() {
    return null
  }
}

ActionHandler.defaultProps = {
  on: 'SUCCEED',
  onHappening: action => action.payload,
}

ActionHandler.propTypes = {
  actionName: props => {
    if (props.actionName && !props.onHappening) {
      throw new Error('actionName prop required onHappening function prop.')
    }
  },
  onSucceed: props => {
    if (!props.onHappening && !props.onSucceed && !props.onStarted && !props.onFailed && !props.onEnded || (props.onSucceed && typeof props.onSucceed !== 'function')) {
      throw new Error('One of props ["onSucceed", "onStarted", "onFailed", "onEnded"] is required.')
    }
  },
  name: props => {
    if (!props.name && !props.actionName) {
      throw new Error('One of props name or actionName is required.')
    }
  },
  onHappening: PropTypes.func,
  onStarted: PropTypes.func,
  onFailed: PropTypes.func,
  onEnded: PropTypes.func,
}
export default ActionHandler