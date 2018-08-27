import React from 'react'
import { Overlay, ActionConst, Scene, Modal } from 'react-native-router-flux'
import { ActionHandler } from './Store'
import { RouterWithRedux } from './Utils'
import { NAVIGATION_RESET } from './Constants'
import HomeScreen from './Containers/HomeScreen'
import ObstacleHiringModal from './Containers/ObstacleHiring/Modal'

class Router extends React.Component {
  render() {
    return (
      <React.Fragment>
        <ActionHandler
          actionName={ActionConst.FOCUS}
          onHappening={action => ({ scene: action.params })}
        />
        <ActionHandler
          actionName={NAVIGATION_RESET}
          onHappening={action => ({ scene: action.actions[0].params })}
        />
        <ActionHandler
          actionName={ActionConst.BACK}
          onHappening={action => ({ scene: action.params })}
        />
        <ActionHandler
          actionName={ActionConst.PUSH}
          onHappening={action => ({ scene: action.params })}
        />

        <RouterWithRedux>
          <Overlay key="Overlay">
            <Modal key="modal" hideNavBar>
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
