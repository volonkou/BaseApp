import React, { Component } from 'react';
import NavigationUtil from "../navigator/navigationUtil";
import SplashScreen from 'react-native-splash-screen'
import { connect } from "react-redux";
import AsyncStorage from '@react-native-community/async-storage';
import actions from "../action"
import { PutLoginSystem, GetUserDetail } from "../action/system"

class WelcomePage extends Component {
    componentDidMount() {
        this.props.onThemeInit();
        this.props.onLanguageInit();

        SplashScreen.hide();
        NavigationUtil.navigation = this.props.navigation;

        // AsyncStorage.removeItem("token")
        this.props.onShowLoginView(true)
        AsyncStorage.getItem("token").then(res => {
            if (res) {
                PutLoginSystem({ "token": res }).then(token => {
                    GetUserDetail(token.access_token)
                    AsyncStorage.setItem("token", token.access_token)
                    this.props.onShowLoginView(false)
                    this.timer = setTimeout(() => {
                        // 这里可以加广告
                        NavigationUtil.resetToHomPage({
                            navigation: this.props.navigation
                        })
                    }, 200);
                })
            } else {
                this.props.onShowLoginView(true)
                this.timer = setTimeout(() => {
                    // 这里可以加广告
                    NavigationUtil.resetToHomPage({
                        navigation: this.props.navigation
                    })
                }, 200);
            }
           
        })


    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }

    render() {
        // 这里放防止白屏内容
        return null;
    }
}

const mapDispatchToProps = dispatch => ({
    onThemeInit: () => dispatch(actions.onThemeInit()),
    onLanguageInit: () => dispatch(actions.onLanguageInit()),
    onShowLoginView: (show) => dispatch(actions.onShowLoginView(show)),
});

export default connect(null, mapDispatchToProps)(WelcomePage)