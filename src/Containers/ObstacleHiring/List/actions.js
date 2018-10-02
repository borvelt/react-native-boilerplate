import { setState, newAction, findAction, store } from '../../../Store'
import { SEARCHBAR_CHANGE, OBSTACLE_HIRING_RETRIEVE } from '../../../Constants'
import Model from '../model'

setState({
  obstacleHiring: {
    asking: false,
    list: [],
  },
})

newAction(SEARCHBAR_CHANGE)
  .onSucceed(() => ({
    obstacleHiring: {
      asking: true,
    },
  }))
  .make()

newAction(OBSTACLE_HIRING_RETRIEVE)
  .setAsync(true)
  .setOnDispatchListener(text => {
    let conditions
    if (text.length) {
      conditions = `chapter LIKE '*${text}*' OR description LIKE '*${text}*' OR segment LIKE '*${text}*' SORT(chapter ASC)`
    } else {
      conditions = 'chapter LIKE "**" SORT(chapter ASC) DISTINCT(chapter)'
    }
    return new Model().fetch(conditions)
  })
  .onStarted(() => ({
    obstacleHiring: {
      loading: true,
      asking: false,
    },
  }))
  .onSucceed(action => ({
    obstacleHiring: {
      list: action.payload,
    },
  }))
  .onEnded(() => ({
    obstacleHiring: {
      loading: false,
    },
  }))
  .make()

store.subscribe(() => {
  if (store.state.obstacleHiring.asking) {
    store.dispatch(
      findAction(OBSTACLE_HIRING_RETRIEVE).prepareForDispatch(
        store.state.searchBar.value,
      ),
    )
  }
})
