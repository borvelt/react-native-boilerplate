import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Overlay, ActionConst, Scene, Modal } from 'react-native-router-flux'
import { RouterWithRedux } from './Utils'
import { NAVIGATION_RESET } from './Constants'
import { Actions } from './Store'
import HomeScreen from './Containers/HomeScreen'
import ObstacleHiringModal from './Containers/ObstacleHiring/Modal'

class Router extends Component {
  static contextTypes = {
    store: PropTypes.object,
  }

  constructor(props, context) {
    super(props, context)
    this.store = context.store
    Actions.handle({
      actionName: ActionConst.FOCUS,
      onHappening: action => ({ scene: action.params }),
    })
    Actions.handle({
      actionName: NAVIGATION_RESET,
      onHappening: action => ({ scene: action.actions[0].params }),
    })
    Actions.handle({
      actionName: ActionConst.BACK,
      onHappening: action => ({ scene: action.params }),
    })
    Actions.handle({
      actionName: ActionConst.PUSH,
      onHappening: action => ({ scene: action.params }),
    })
  }

  render() {
    return (
      <React.Fragment>
        <RouterWithRedux>
          <Overlay key="Overlay">
            <Modal key="modal" hideNavBar>
              {/* <Scene
                key="HomeScreen"
                component={() => <Text>Hi</Text>}
                initial
              /> */}
              <Scene key="HomeScreen" component={HomeScreen} initial />
              <Scene key="OstacleHiringModal" component={ObstacleHiringModal} />
            </Modal>
          </Overlay>
        </RouterWithRedux>
      </React.Fragment>
    )
  }
}
export default Router
