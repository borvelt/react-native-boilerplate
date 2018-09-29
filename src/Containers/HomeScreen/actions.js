import { setState, Actions } from '../../Store'
import { SEARCHBAR_CHANGE, SEARCHBAR_TYPING } from '../../Constants'

setState({
  searchBar: {
    value: '',
    isTyping: false,
  },
})

Actions.create(SEARCHBAR_CHANGE, {
  onSucceed: action => ({
    searchBar: {
      value: action.payload,
    },
  }),
})

Actions.create(SEARCHBAR_TYPING, {
  onSucceed: action => ({
    searchBar: {
      isTyping: action.payload,
    },
  }),
})
