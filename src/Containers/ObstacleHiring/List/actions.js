import {
  Store,
  DefaultStates,
  Action,
  ActionHandler,
  ActionSelector,
} from '../../../Store'
import fixure from './fixture.json'
import {
  OBSTACLE_HIRING_TABLE_DROP,
  OBSTACLE_HIRING_TABLE_CREATE,
  SEARCHBAR_CHANGE,
  OBSTACLE_HIRING_RETRIEVE,
  OBSTACLE_HIRING_INITIALIZE,
} from '../../../Constants'
import Model, {
  DropSchema,
  CreateSchema,
} from './model'

DefaultStates({
  db: {
    isReady: false,
    dropped: false,
    created: false,
    initialized: false,
  },
  obstacleHiring: {
    asking: false,
    list: [],
    selfRetrieve: false,
  },
})

Action({
  async: true,
  selfDispatch: true,
  name: OBSTACLE_HIRING_TABLE_DROP,
  onDispatch: DropSchema,
  onEnded: () => ({
    db: {
      isReady: true,
      dropped: true,
    },
  }),
})

Action({
  async: true,
  selfDispatch: true,
  name: OBSTACLE_HIRING_TABLE_CREATE,
  onDispatch: CreateSchema,
  onStarted: () => ({
    db: {
      isReady: false,
    },
  }),
  onSucceed: action => ({
    db: action.payload,
  }),
  onEnded: () => ({
    db: {
      isReady: true,
      created: true,
    },
  }),
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
  onDispatch: Model.search,
  onStarted: () => ({
    db: {
      isReady: false,
    },
    obstacleHiring: {
      loading: true,
      asking: false,
      selfRetrieve: true,
    },
  }),
  onSucceed: action => ({
    obstacleHiring: {
      list: action.payload,
    },
  }),
  onEnded: () => ({
    db: {
      isReady: true,
    },
    obstacleHiring: {
      loading: false,
    },
  }),
})

Action({
  async: true,
  name: OBSTACLE_HIRING_INITIALIZE,
  onDispatch: () => {
    let allPromises = []
    for (let index in fixure) {
      for (let indx in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) {
        fixure[index].segment = indx
        fixure[index].description = `this is description of ${fixure[index].chapter} and number ${indx}`
        let sample = new Model(fixure[index])
        allPromises.push(sample.save())
      }
    }
    return Promise.all(allPromises)
  },
  onStarted: () => ({
    db: {
      isReady: false,
    },
  }),
  onSucceed: () => ({
    db: {
      isReady: true,
      intialized: true,
    },
  }),
})

Store.subscribe(() => {
  const state = Store.getState()
  const dispatch = Store.dispatch
  if (state.obstacleHiring.asking && state.db.isReady) {
    dispatch(ActionSelector(OBSTACLE_HIRING_RETRIEVE)(state.searchBar.value))
  }
  if (state.db.isReady && state.db.created && !state.db.intialized) {
    dispatch(ActionSelector(OBSTACLE_HIRING_INITIALIZE)())
  }
  if(state.db.isReady && state.db.intialized && !state.obstacleHiring.selfRetrieve) {
    dispatch(ActionSelector(OBSTACLE_HIRING_RETRIEVE)(''))
  }
})
