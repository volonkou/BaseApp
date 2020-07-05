import React, {Component} from 'react';
import NavigationUtil from "../navigator/navigationUtil";
import SplashScreen from 'react-native-splash-screen'
import {connect} from "react-redux";
import actions from "../action"

class WelcomePage extends Component {
    componentDidMount() {
        this.props.onThemeInit();
        this.timer = setTimeout(() => {
            SplashScreen.hide();
            NavigationUtil.resetToHomPage({
                navigation: this.props.navigation
            })
        }, 200);
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }

    render() {
        return null;
    }
}

const mapDispatchToProps = dispatch => ({
    onThemeInit: () => dispatch(actions.onThemeInit()),
});

export default connect(null, mapDispatchToProps)(WelcomePage)