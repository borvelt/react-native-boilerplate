import React, { Component } from 'react'
import getTheme from '../../native-base-theme/components'
import color from '../../native-base-theme/variables/material'
import { Provider } from 'react-redux'
import { StyleProvider, Text } from 'native-base'
import { store } from '../Store'
import RouterStack from '../Router'
import ObstacleHiringFixture from './ObstacleHiring/fixture'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
    }
  }
  async componentDidMount() {
    this.setState({
      loading: false,
    })
    await ObstacleHiringFixture()
    this.setState({
      loading: true,
    })
  }
  render() {
    if (!this.state.loading) {
      return <Text>Please Wait...</Text>
    }
    return (
      <StyleProvider style={getTheme(color)}>
        <Provider store={store}>
          <RouterStack />
        </Provider>
      </StyleProvider>
    )
  }
}

export default App
