import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {View,Text} from "react-native"
import AppNavigator from './src/navigator/AppNavigators';
import store from './src/store'

export default class App extends Component{
    render() {
        /**
         * 将store传递给App框架
         */
        return <Provider store={store}>
            <AppNavigator/>
        </Provider>
    }
}