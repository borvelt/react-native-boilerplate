# React-Native Plug & Play
Let's use React Native Plug And Play, very simple.

This boilerplate is a simple react native application with realmjs database, redux-peach state manager, router-flux and nativebase UI component.

## Installation
Download or clone repository
```bash
$ clone GIT_REPOSITORY [project-name]
```
Install node modules
```bash
$ npm install
```
#### Running application
Before run application you need to upgrade, run this command
```bash
$ react-native upgrade
# link libraries
$ react-native link
```
After upgrade
```bash
$ react-native run-ios
```
#### if you got error with running application remove node_modules directory and then install again.

## Code Overview

Main part of project is `src` directory, this directory contain main codes of project.

Components directory contains project components that can you every where(maybe other project) and they don't have dependency to other components.

Container contains project screen or part of screen that mean boundle of component that has relation with each other.(action, view, models and etc)

## Third party libraries
* react-devtools
  
  This library inspect react components like chrome inspector.

* remote-redux-devtools

  Show every changes in redux-store. Log every actions and you can see state changes.
## Test
Test with jest, Write your test cases and then run `npm test`.
## License
MIT
