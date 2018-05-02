import React from 'react';
import {View, Text} from 'react-native';
import {StackNavigator} from 'react-navigation';

import Launch from '../pages/launch/index';
import TabBar from '../containers/tabbar';
import WebViewPage from '../pages/web/WebView';

const AppNavigation = StackNavigator({
    Launch: {
        screen: Launch
    },
    TabBar: {
        screen: TabBar
    },
    Webv: {
        screen: WebViewPage
    }
},
    {
        initialRouteName: 'Launch',
        navigationOptions:{
            headerBackTitle: null,
            headerStyle:{
                backgroundColor: '#fff',
            },
            headerTitleStyle:{
                color: '#333',
                alignSelf: 'center',
            },
            cardStack:{
                gesturesEnabled: true
            },
            headerRight: (<View/>)
        },
        mode: 'card', //定义跳转风格 ,card：使用iOS和安卓默认的风格
        headerMode: 'screen' // 返回上级页面时动画效果,screen：滑动过程中，整个页面都会返回
    }
);

export default AppNavigation;