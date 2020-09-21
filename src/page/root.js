import React, { Component } from 'react';
import NavigationUtil from "../navigator/navigationUtil";
import SafeAreaViewPlus from "../common/SafeAreaViewPlus";
import TabNavigator from "../navigator/TabNavigator"
import actions from "../action"
import Theme from "./theme"
import Language from "./language"
import Login from "./login"
import { connect } from 'react-redux';

class RootPage extends Component {
    constructor(props) {
        super(props);
    }

    renderThemeView() {
        const { customThemeViewVisible, onShowCustomThemeView } = this.props
        return (
            <Theme
                visible={customThemeViewVisible}
                {...this.props}
                onClose={() => onShowCustomThemeView(false)}
            />
        )
    }
    renderLanguageView() {
        const { customLanguageViewVisible, onShowCustomLanguageView } = this.props
        return (
            <Language
                visible={customLanguageViewVisible}
                {...this.props}
                onClose={() => onShowCustomLanguageView(false)}
            />
        )
    }

    renderLoginView() {
        const { customLoginViewVisible } = this.props
        return (
            <Login
                visible={customLoginViewVisible}
                {...this.props}
            />
        )
    }

    render() {
        NavigationUtil.navigation = this.props.navigation;
        const { theme } = this.props;
        return <SafeAreaViewPlus topColor={theme.themeColor}>
            <TabNavigator />
            {this.renderLoginView()}
            {this.renderThemeView()}
            {this.renderLanguageView()}
        </SafeAreaViewPlus>
    }
}


const mapStateToProps = state => ({
    nav: state.nav,
    customThemeViewVisible: state.theme.customThemeViewVisible,
    customLanguageViewVisible: state.language.customLanguageViewVisible,
    theme: state.theme.theme,
    customLoginViewVisible: state.login.customLoginViewVisible
})



const mapDispatchToProps = dispatch => ({
    onShowCustomThemeView: (show) => dispatch(actions.onShowCustomThemeView(show)),
    onShowCustomLanguageView: (show) => dispatch(actions.onShowCustomLanguageView(show)),
    onShowLoginView: (show) => dispatch(actions.onShowLoginView(show)),
})

export default connect(mapStateToProps, mapDispatchToProps)(RootPage)