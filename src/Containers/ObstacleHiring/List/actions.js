import {
  Store,
  DefaultStates,
  Action,
  ActionHandler,
  ActionSelector,
} from '../../../Store'
import { SEARCHBAR_CHANGE, OBSTACLE_HIRING_RETRIEVE } from '../../../Constants'
import Model from '../model'

DefaultStates({
  obstacleHiring: {
    asking: false,
    list: [],
  },
})

ActionHandler({
  name: SEARCHBAR_CHANGE,
  onSucceed: () => ({
    obstacleHiring: {
      asking: true,
    },
  }),
})

Action({
  async: true,
  name: OBSTACLE_HIRING_RETRIEVE,
  onDispatch: text => {
    let conditions
    if (text.length) {
      conditions = `chapter LIKE '*${text}*' OR description LIKE '*${text}*' OR segment LIKE '*${text}*' SORT(chapter ASC)`
    } else {
      conditions = 'chapter LIKE "**" SORT(chapter ASC) DISTINCT(chapter)'
    }
    return new Model().fetch(conditions)
  },
  onStarted: () => ({
    obstacleHiring: {
      loading: true,
      asking: false,
    },
  }),
  onSucceed: action => ({
    obstacleHiring: {
      list: action.payload,
    },
  }),
  onEnded: () => ({
    obstacleHiring: {
      loading: false,
    },
  }),
})

Store.subscribe(() => {
  const state = Store.getState()
  const dispatch = Store.dispatch
  if (state.obstacleHiring.asking) {
    dispatch(ActionSelector(OBSTACLE_HIRING_RETRIEVE)(state.searchBar.value))
  }
})
