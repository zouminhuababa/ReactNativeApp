import React,{Component} from  'react';
import {
    View,
    Text
} from 'react-native';

import { Provider } from 'react-redux';
import configureStore from './store/StoreConfigure';
import AppNavigation from "./containers/navigation";

// const store = configureStore();
{/*<Provider store={store}>
    <AppNavigation/>
</Provider>*/}
export default class extends Component {
    render(){
        return(
            <AppNavigation/>
        )
    }
}