import React, {Component} from 'react';
import {createAppContainer} from "react-navigation";
import {createBottomTabNavigator,BottomTabBar} from "react-navigation-tabs";
import {connect} from 'react-redux';
import HomePage from '../page/Home';
import ClassifyPage from '../page/classify';
import FavoritePage from '../page/Favorite';
import MyPage from '../page/my';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import EventTypes from '../util/EventTypes';
import EventBus from 'react-native-event-bus'


const TABS = {//在这里配置页面的路由
    HomePage: {
        screen: HomePage,
        navigationOptions: {
            tabBarIcon: ({tintColor}) => (
                <MaterialIcons
                    name={'home'}
                    size={26}
                    style={{color: tintColor}}
                />
            ),
        }
    },
    ClassifyPage:
        {
            screen: ClassifyPage,
            navigationOptions: {
                tabBarIcon: ({tintColor}) => (
                    <Ionicons
                        name={'md-list'}
                        size={26}
                        style={{color: tintColor}}
                    />
                ),
            }
        }
    ,
    FavoritePage: {
        screen: FavoritePage,
        navigationOptions: {
            tabBarIcon: ({tintColor}) => (
                <MaterialIcons
                    name={'favorite'}
                    size={26}
                    style={{color: tintColor}}
                />
            ),
        }
    }
    ,
    MyPage: {
        screen: MyPage,
        navigationOptions: {
            tabBarIcon: ({tintColor}) => (
                <Entypo
                    name={'user'}
                    size={26}
                    style={{color: tintColor}}
                />
            ),
        }
    }
};

class TabNavigator extends Component {
    constructor(props) {
        super(props);
        console.disableYellowBox = true;
    }

    _tabNavigator() {
        // if (this.Tabs) {
        //     return this.Tabs;
        // }
        const {language}=this.props
        const {HomePage, ClassifyPage, FavoritePage, MyPage} = TABS;
        const tabs = {HomePage, ClassifyPage, FavoritePage, MyPage};
        HomePage.navigationOptions.tabBarLabel = language.tab1;
        ClassifyPage.navigationOptions.tabBarLabel = language.tab2;
        FavoritePage.navigationOptions.tabBarLabel = language.tab3;
        MyPage.navigationOptions.tabBarLabel = language.tab4;
      
        
        return this.Tabs = createAppContainer(createBottomTabNavigator(tabs, {
                tabBarComponent: props => {
                    return <TabBarComponent theme={this.props.theme} {...props}/>
                }
            }
        ))
    }

    render() {
        const Tab = this._tabNavigator();
        return <Tab
            onNavigationStateChange={(prevState, newState, action) => {
                EventBus.getInstance().fireEvent(EventTypes.bottom_tab_select, {
                    from: prevState.index,
                    to: newState.index
                })
            }}
        />
    }
}

class TabBarComponent extends React.Component {
    constructor(props) {
        super(props);
        this.theme = {
            tintColor: props.activeTintColor,
            updateTime: new Date().getTime(),
        }
    }

    render() {
        return <BottomTabBar
            {...this.props}
            activeTintColor={this.props.theme.themeColor}
        />
    }
}

const mapStateToProps = state => ({
    theme:state.theme.theme,
    language:state.language.language,
});

export default connect(mapStateToProps)(TabNavigator);
