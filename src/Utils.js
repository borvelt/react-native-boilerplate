// import React from 'react'
import {
  Router,
  // Reducer,
} from 'react-native-router-flux'
// import {
//   connect,
// } from 'react-redux'

// class RouterWithReduxClass extends React.Component {
//   constructor(props) {
//     super(props)
//     this.reducerCreate = this.reducerCreate.bind(this)
//   }
//   reducerCreate(params) {
//     const defaultReducer = new Reducer(params)
//     return (state, action) => {
//       this.props.dispatch(action)
//       return defaultReducer(state, action)
//     }
//   }

//   render() {
//     return (
//       <Router createReducer={this.reducerCreate} getSeceneStyle={{}}>
//         {this.props.children}
//       </Router>
//     )
//   }
// }

// export const RouterWithRedux = connect()(RouterWithReduxClass)
export const RouterWithRedux = Router

export function mergeCustomizer(objValue, srcValue) {
  if (Array.isArray(objValue) && Array.isArray(srcValue)) {
    return srcValue
  }
}
