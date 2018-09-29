import { setState, Actions, store } from '../../../Store'
import { SEARCHBAR_CHANGE, OBSTACLE_HIRING_RETRIEVE } from '../../../Constants'
import Model from '../model'

setState({
  obstacleHiring: {
    asking: false,
    list: [],
  },
})

Actions.handle(SEARCHBAR_CHANGE, {
  onSucceed: () => ({
    obstacleHiring: {
      asking: true,
    },
  }),
})

Actions.new(OBSTACLE_HIRING_RETRIEVE, {
  async: true,
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

store.toReduxStoreObject().subscribe(() => {
  const dispatch = store.dispatch
  if (store.state.obstacleHiring.asking) {
    dispatch(Actions.get(OBSTACLE_HIRING_RETRIEVE)(store.state.searchBar.value))
  }
})
