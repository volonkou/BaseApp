import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import WelcomePage from '../page/welcome';
import RootPage from "../page/root"
import { connect } from 'react-redux';
import { createReactNavigationReduxMiddleware, createReduxContainer } from 'react-navigation-redux-helpers';

export const rootCom = 'Init';

const InitNavigator = createStackNavigator({
    WelcomePage: {
        screen: WelcomePage,
        navigationOptions: {
            headerShown: false,
        },
    },
});




const MainNavigator = createStackNavigator({
    RootPage: {
        screen: RootPage,
        navigationOptions: {
            headerShown: false
        },
    }
}, {
    defaultNavigationOptions: {
        headerShown: false
    },
});



export const RootNavigator = createAppContainer(createSwitchNavigator({
    [rootCom]: InitNavigator,
    Main: MainNavigator,
}, {
    navigationOptions: {
        headerShown: false,
    },
}));


export const middleware = createReactNavigationReduxMiddleware(
    state => state.nav,
    'root',
);


const AppWithNavigationState = createReduxContainer(RootNavigator, 'root');


const mapStateToProps = state => ({
    state: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);