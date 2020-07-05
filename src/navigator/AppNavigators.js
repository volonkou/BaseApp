import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import WelcomePage from '../page/welcome';
import RootPage from "../page/root"
import { connect } from 'react-redux';
import { createReactNavigationReduxMiddleware, createReduxContainer } from 'react-navigation-redux-helpers';

export const rootCom = 'Init';//设置根路由，对应RootNavigator中第一个初始化的路由名

const InitNavigator = createStackNavigator({
    WelcomePage: {
        screen: WelcomePage,
        navigationOptions: {
            headerShown: false,// 可以通过将headerShown设为null 来禁用StackNavigator的Navigation Bar
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


// 初始化react-navigation与redux的中间件，作用就是为createReduxContainer的key设置actionSubscribers(行为订阅者)
export const middleware = createReactNavigationReduxMiddleware(
    state => state.nav,
    'root',
);


// 将根导航器组件传递给 createReduxContainer 函数,
const AppWithNavigationState = createReduxContainer(RootNavigator, 'root');


const mapStateToProps = state => ({
    state: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);