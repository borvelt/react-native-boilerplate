import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Header, Item, Icon, Container } from 'native-base'
import { connect } from 'react-redux'
import InputWithIsTyping from '../../Components/InputWithIsTyping'
import { SEARCHBAR_TYPING, SEARCHBAR_CHANGE } from '../../Constants'
import { findAction } from '../../Store'
import './actions'
import ObstacleHiring from '../ObstacleHiring/List'

const Styles = StyleSheet.create({
  Header: {
    padding: 10,
    paddingTop: 40,
  },
})

class HomeScreen extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Container>
        <Header noShadow searchBar rounded style={Styles.Header}>
          <Item>
            <Icon name="ios-search" />
            <InputWithIsTyping
              value={this.props.searchBarValue}
              onChange={this.props.searchBarChanged}
              onTyping={this.props.searchBarTyping}
            />
            <Icon name="ios-people" />
          </Item>
        </Header>
        <ObstacleHiring />
      </Container>
    )
  }
}

export default connect(
  state => ({
    searchBarValue: state.searchBar.value,
  }),
  dispatch => ({
    searchBarChanged: text =>
      dispatch(findAction(SEARCHBAR_CHANGE).prepareForDispatch(text)),
    searchBarTyping: value =>
      dispatch(findAction(SEARCHBAR_TYPING).prepareForDispatch(value)),
  }),
)(HomeScreen)
