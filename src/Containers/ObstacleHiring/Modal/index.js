import React, {
  Component,
} from 'react'
import {
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native'
import {
  connect,
} from 'react-redux'
import {
  View,
  Button,
  Text,
  Icon,
} from 'native-base'
import {
  Actions,
} from 'react-native-router-flux'
import {
  ActionSelector,
} from '../../../Store'
import {
  SEARCHBAR_CHANGE,
} from '../../../Constants'
import Modal from '../../../Components/Modal'
import nativeBaseTheme from '../../../../native-base-theme/variables/material'

const {
  width,
  height,
} = Dimensions.get('window')

class ObstacleHiringModal extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (<Modal>
      <View flex={1} style={styles.modalView}>
        <TouchableOpacity onPress={this.props.setSearchBarValue.bind(this, this.props.data.chapter)}>
          <View style={styles.chapterBox}>
            <Text style={styles.chapterBoxText}>{this.props.data.chapter}</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.descriptionBox}>
          <Text style={styles.descriptionBoxText}>{this.props.data.description}</Text>
        </View>
        <View style={styles.actionsBox}>
          <Button iconLeft light onPress={Actions.pop}>
            <Icon name='close' />
            <Text>Close</Text>
          </Button>
        </View>
      </View>
    </Modal>)
  }
}


const styles = StyleSheet.create({
  modalView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  chapterBox: {
    justifyContent: 'center',
    alignItems: 'center',
    width: width - 15,
    height: height * 0.1,
    borderRadius: 3,
    backgroundColor: nativeBaseTheme.brandPrimary,
    marginBottom: 10,
  },
  chapterBoxText: {
    fontSize: nativeBaseTheme.fontSizeH3,
    color: nativeBaseTheme.inverseTextColor,
  },
  descriptionBox: {
    justifyContent: 'center',
    alignItems: 'center',
    width: width - 15,
    borderRadius: 3,
    height: height * 0.6,
    backgroundColor: nativeBaseTheme.containerBgColor,
    marginBottom: 10,
  },
  descriptionBoxText: {
    fontSize: nativeBaseTheme.fontSizeBase,
    color: nativeBaseTheme.textColor,
  },
  actionsBox: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default connect(undefined, dispatch => ({
  setSearchBarValue(text) {
    dispatch(ActionSelector(SEARCHBAR_CHANGE)(text))
    Actions.pop()
  },
}))(ObstacleHiringModal)