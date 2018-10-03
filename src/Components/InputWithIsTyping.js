import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Input } from 'native-base'
import { WAIT_INTERVAL } from '../Constants'

const Styles = StyleSheet.create({
  searchInput: {
    textAlign: 'left',
  },
})

class InputWithIsTyping extends Component {
  timer = undefined

  constructor(props) {
    super(props)
    this._onChangeText = this._onChangeText.bind(this)
  }

  render() {
    return (
      <Input
        value={this.props.value}
        style={Styles.searchInput}
        placeholder="Search"
        onChangeText={this._onChangeText}
        ref={ref => (this._input = ref)}
      />
    )
  }

  _onChangeText(text) {
    clearTimeout(this.timer)
    this.props.onTyping(true)
    this.timer = setTimeout(() => {
      this.props.onTyping(false)
      this.props.onChange(text)
    }, WAIT_INTERVAL)
  }
}

export default InputWithIsTyping
