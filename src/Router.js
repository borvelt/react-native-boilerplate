import React, { Component } from 'react'
import { Overlay, ActionConst, Scene, Modal } from 'react-native-router-flux'
import { RouterWithRedux } from './Utils'
import { NAVIGATION_RESET } from './Constants'
import { newAction } from './Store'
import HomeScreen from './Containers/HomeScreen'
import ObstacleHiringModal from './Containers/ObstacleHiring/Modal'

class Router extends Component {
  constructor(props) {
    super(props)
    newAction(ActionConst.FOCUS)
      .onHappened(action => ({ scene: action.params }))
      .make()
    newAction(NAVIGATION_RESET)
      .onHappened(action => ({ scene: action.params }))
      .make()
    newAction(ActionConst.BACK)
      .onHappened(action => ({ scene: action.params }))
      .make()
    newAction(ActionConst.PUSH)
      .onHappened(action => ({ scene: action.params }))
      .make()
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
