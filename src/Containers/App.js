import React from 'react'
import getTheme from '../../native-base-theme/components'
import color from '../../native-base-theme/variables/material'
import {
  Provider,
} from 'react-redux'
import {
  StyleProvider,
} from 'native-base'
import {
  Store,
} from '../Store'
import RouterStack from '../Router'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
    }
  }
  async componentDidMount() {
    this.setState({
      loading: false,
    })
  }
  render() {
    if (this.state.loading) {
      return null
    }
    return (
      <StyleProvider style={getTheme(color)}>
        <Provider store={Store}>
          <RouterStack />
        </Provider>
      </StyleProvider>)
  }
}

export default App