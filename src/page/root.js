import React, { Component } from 'react';
import NavigationUtil from "../navigator/navigationUtil";
import SafeAreaViewPlus from "../common/SafeAreaViewPlus";
import TabNavigator from "../navigator/TabNavigator"
import actions from "../action"
import Theme from "./theme"
import { connect } from 'react-redux';

class RootPage extends Component {
    constructor(props) {
        super(props);
    }

    renderThemeView (){
        const { customThemeViewVisible, onShowCustomThemeView } = this.props
        return (
            <Theme
                visible={customThemeViewVisible}
                {...this.props}
                onClose={() => onShowCustomThemeView(false)}
            />
        )
    }

    render() {
        NavigationUtil.navigation = this.props.navigation;

        return <SafeAreaViewPlus>
            <TabNavigator/>
            {this.renderThemeView()}
        </SafeAreaViewPlus>
    }
}


const mapStateToProps = state => ({
    nav: state.nav,
    customThemeViewVisible: state.theme.customThemeViewVisible,
    theme: state.theme.theme
})



const mapDispatchToProps = dispatch => ({
    onShowCustomThemeView: (show) => dispatch(actions.onShowCustomThemeView(show))
})

export default connect(mapStateToProps,mapDispatchToProps)(RootPage)