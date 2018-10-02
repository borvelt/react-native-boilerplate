import React from 'react'
import KeyboardSpacer from 'react-native-keyboard-spacer'
import groupBy from 'lodash/groupBy'
import { Actions } from 'react-native-router-flux'
import { FlatList, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { ListItem, Text, View } from 'native-base'
import { findAction } from '../../../Store'
import { SEARCHBAR_CHANGE, OBSTACLE_HIRING_RETRIEVE } from '../../../Constants'
import './actions'

const Styles = StyleSheet.create({
  ListContainer: {
    flex: 1,
  },
})

class ObstacleHiringList extends React.Component {
  listSeparatorIndex = []

  constructor(props) {
    super(props)
    this._renderListItem = this._renderListItem.bind(this)
    this._renderGroupsItem = this._renderGroupsItem.bind(this)
    this.props.initialRetrieve()
  }

  _prepareData() {
    const groupByData = groupBy(this.props.data, obj => obj.chapter)
    const groups = Object.keys(groupByData)
    const groupsCount = {}
    for (let index in groups) {
      groupsCount[groups[index]] = groupByData[groups[index]]
    }
    let index = 0
    this.listseparatorIndex = Object.values(groupsCount).map((val, indx) => {
      if (indx === 0) {
        return 0
      }
      return (index = val.length + index)
    })
  }

  render() {
    this.listseparatorIndex = []
    let renderItem
    if (this.props.searchBarValue.length) {
      this._prepareData()
      renderItem = this._renderListItem
    } else {
      renderItem = this._renderGroupsItem
    }
    return (
      <View style={Styles.ListContainer}>
        <FlatList
          data={this.props.data}
          keyboardShouldPersistTaps={'handled'}
          keyExtractor={item => `${item.id}`}
          renderItem={renderItem}
        />
        <KeyboardSpacer />
      </View>
    )
  }

  _renderListItem({ item, index }) {
    let renderSeparator = null
    if (
      typeof this.listseparatorIndex.find(elm => elm === index) !==
      typeof undefined
    ) {
      renderSeparator = (
        <ListItem itemDivider>
          <Text>{item.chapter}</Text>
        </ListItem>
      )
    }
    return (
      <React.Fragment>
        {renderSeparator}
        <ListItem onPress={this._listItemOnPress.bind(this, item)}>
          <Text>{item.description}</Text>
        </ListItem>
      </React.Fragment>
    )
  }

  _renderGroupsItem({ item }) {
    return (
      <ListItem onPress={this._listGroupOnPress.bind(this, item)}>
        <Text>{item.chapter}</Text>
      </ListItem>
    )
  }

  _listItemOnPress(item) {
    Actions.OstacleHiringModal({
      data: item,
    })
  }

  _listGroupOnPress(item) {
    this.props.setSearchBarValue(item.chapter)
  }
}

export default connect(
  state => ({
    data: state.obstacleHiring.list,
    searchBarValue: state.searchBar.value,
  }),
  dispatch => ({
    initialRetrieve: () =>
      dispatch(findAction(OBSTACLE_HIRING_RETRIEVE).prepareForDispatch('')),
    setSearchBarValue: text =>
      dispatch(findAction(SEARCHBAR_CHANGE).prepareForDispatch(text)),
  }),
  undefined,
  {
    pure: true,
    areStatesEqual: (a, b) => {
      console.log('a === b', a === b, a.__, b.__)
      return a === b
    },
  },
)(ObstacleHiringList)
