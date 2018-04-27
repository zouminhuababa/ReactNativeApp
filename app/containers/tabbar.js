import React from 'react';
import {TabNavigator} from 'react-navigation';
import {
    Image,
    Platform,
    View,
} from 'react-native';

import Home from '../pages/home/Home';
import Community from '../pages/community/Community';
import My from '../pages/my/My';

import * as color from '../constants/color';

const TabBar  = TabNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            headerTitle: '首页',
            tabBarLabel: '首页',
            headerLeft: null,
            tabBarIcon: ({tintColor}) => {
                return(
                    <Image
                        resizeMode='contain'
                        source={require('../images/home_normal_icon.png')}
                        style={{
                            width: 20,
                            height: 20,
                            tintColor: tintColor,
                        }}
                    />
                )
            }
        }
    },
    Community: {
        screen: Community,
        navigationOptions: {
            headerTitle: '社区',
            tabBarLabel: '社区',
            headerLeft: null,
            tabBarIcon: ({tintColor}) => {
                return(
                    <Image
                        resizeMode='contain'
                        source={require('../images/community_normal_icon.png')}
                        style={{
                            width: 20,
                            height: 20,
                            tintColor: tintColor,
                        }}
                    />
                )
            }
        }
    },
    My: {
        screen: My,
        navigationOptions: {
            headerTitle: '我的',
            tabBarLabel: '我的',
            headerLeft: null,
            tabBarIcon: ({tintColor}) => {
                return(
                    <Image
                        resizeMode='contain'
                        source={require('../images/my_normal_icon.png')}
                        style={{
                            width: 20,
                            height: 20,
                            tintColor: tintColor,
                        }}
                    />
                )
            }
        }
    },
},{
    tabBarPosition: 'bottom',
    lazy: true,
    swipeEnabled: false,
    animationEnabled: false,
    tabBarOptions: {
        showIcon: true,
        style: {
            height: 50,
            backgroundColor: '#ffffff',
            zIndex: 0,
            position: 'relative',
        },
        labelStyle: {
            fontSize: 11,
            paddingVertical: 0,
            paddingTop: (Platform.OS === 'android' || (Platform.OS === 'ios' && Platform.Version < 10)) ? 0 : 15,
        },
        iconStyle: {
            marginTop: -2
        },
        tabStyle: {
            backgroundColor: 'white',
        },
        activeBackgroundColor: '#fff',
        activeTintColor: color.theme,
        inactiveBackgroundColor:'white',
        inactiveTintColor: color.black,
    }
})

export default TabBar;
