import React, { Component} from 'react';
import {
    View,
    WebView,
    StyleSheet,
    BackHandler,
} from 'react-native';
import {NavigationActions} from 'react-navigation';

export default class Webv extends Component {
    static navigationOptions = (options) => {
      /*   options = {
            navigation:{},
            navigationOptions:{},
            screenProps: {}
        }*/
  /*      state - The screen's current state/route
        A screen has access to its route via this.props.navigation.state.
        Each will return an object with the following:
        {
            // the name of the route config in the router
            routeName: 'profile',
                //a unique identifier used to sort routes
            key: 'main0',
            //an optional object of string options for this screen
            params: { hello: 'world' }
        }*/
        console.info('mmmmmmmmmmm', options);
    }
    constructor(props) {
        super(props);
        this.canGoBack = false;
    }
    componentDidMount(){
        BackHandler.addEventListener('hardwareBackPress',this._androidGoBack)
    }

    _androidGoBack = () => {
        if (this.canGoBack){
            this.webview.goBack();
            console.info(1)
            return true
        }
        console.info(2)
        return false
    }

    // 当导航状态发生变化的时候调用
    _onNavigationStateChange = (navState) => {
        const {title = ''} = navState;
        console.info('NavigationState',navState);
        console.info('this.props.navigation.state;',this.props.navigation.state);
        if (title) {
            const {key = null} = this.props.navigation.state;
            if (key) {
                const setParam = NavigationActions.setParams({
                    key: key,
                    params: {
                        title: title,
                    }
                });
                this.props.navigation.dispatch(setParam);
            }
        }
        this.canGoBack = navState.canGoBack;
    };

    render(){
        const { params } = this.props.navigation.state;
        return (
            <View style = {{flex: 1}}>
                <WebView
                    ref = {(ref) => {this.webview = ref}}
                    style = {{flex: 1}}
                    onNavigationStateChange = {this._onNavigationStateChange}
                    source = {{uri: params.linkUrl}}/>
            </View>
        );
    }
}