import {
  Action,
  DefaultStates,
} from '../../Store'
import {
  SEARCHBAR_CHANGE,
  SEARCHBAR_TYPING,
} from '../../Constants'

DefaultStates({
  searchBar: {
    value: '',
    isTyping: false,
  },
})
Action({
  name: SEARCHBAR_CHANGE,
  onSucceed: action => ({
    searchBar: {
      value: action.payload,
    },
  }),
})

Action({
  name: SEARCHBAR_TYPING,
  onSucceed: action => ({
    searchBar: {
      isTyping: action.payload,
    },
  }),
})
