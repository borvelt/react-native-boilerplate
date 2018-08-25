import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  StyleSheet,
  Dimensions,
} from 'react-native'
import {
  WHITE,
} from '../Constants'

const {
  height: deviceHeight,
  width: deviceWidth,
} = Dimensions.get('window')

const Modal = ({
  children,
  verticalPercent,
  horizontalPercent,
}) => {
  const height = verticalPercent ? deviceHeight * verticalPercent : deviceHeight
  const width = horizontalPercent ? deviceHeight * horizontalPercent : deviceWidth

  return (
    <View style={[styles.container, { height, width }]}>
      {children}
    </View>
  )
}

Modal.propTypes = {
  children: PropTypes.any,
  verticalPercent: PropTypes.number,
  horizontalPercent: PropTypes.number,
  hideClose: PropTypes.bool,
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: WHITE,
  },
})

export default Modal