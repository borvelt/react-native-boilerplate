import { newAction, setState } from '../../Store'
import { SEARCHBAR_CHANGE, SEARCHBAR_TYPING } from '../../Constants'

setState({
  searchBar: {
    value: '',
    isTyping: false,
  },
})

newAction(SEARCHBAR_TYPING)
  .onSucceed(action => ({
    searchBar: {
      isTyping: action.payload,
    },
  }))
  .make()

newAction(SEARCHBAR_CHANGE)
  .onSucceed(action => ({
    searchBar: {
      value: action.payload,
    },
  }))
  .make()
