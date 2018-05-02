import React,{Component} from  'react';
import {
    BackHandler,
    ToastAndroid
} from 'react-native';

import { Provider } from 'react-redux';

import configureStore from './store/StoreConfigure';
import AppNavigation from "./containers/navigation";

// const store = configureStore();
{/*<Provider store={store}>
    <AppNavigation/>
</Provider>*/}

export default class Index extends Component {

    constructor(props){
        super(props);
        this.lastBackPressed = 0;
        this.state = {
            progress: ''
        }
    }
    // 监听设备上的后退按钮事件。
    // Android：监听后退按钮事件。如果没有添加任何监听函数，
    // 或者所有的监听函数都返回false，则会执行默认行为:退出应用。
    // return false : 退出
    componentDidMount(){
        BackHandler.addEventListener('hardwareHandler',this._androidBack);
    }

    _androidBack = () => {
        if (this.lastBackPressed && this.lastBackPressed + 1000  >= Date.now()){
            BackHandler.exitApp();
            return false
        }
        this.lastBackPressed = Date.now();
        ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT)
        return true
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this._androidBack)
    }

    render(){
        let progressView;
        return(
            <AppNavigation/>
        )
    }
}
