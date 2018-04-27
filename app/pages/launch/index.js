import React,{Component} from 'react';
import {
    View,
    Text,
    Animated,
    Easing,
    StyleSheet
} from 'react-native';

import * as color from '../../constants/color';
import Controller from '../../base/controller';

export default class Launch extends Controller{

    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props);
        this.state = {
            scale: new Animated.Value(1),
            opacity: new Animated.Value(1),
        };
    }

    componentDidMount() {
   /*     Animated.parallel() --同时开始一个动画数组里的全部动画。默认情况下，如果有任何一个动画停止了，其余的也会被停止。
        你可以通过stopTogether 选项来改变这个效果。*/
        const duration = 1500;
        Animated.parallel([
            Animated.timing(this.state.scale, {
                toValue: 2,
                duration: duration,
                easing: Easing.out(Easing.ease),
            }),
            Animated.timing(this.state.opacity, {
                toValue: 0,
                duration: duration,
                easing: Easing.out(Easing.ease),
            })
        ]).start(() => {
            this.setRootController('TabBar');
        });

    }

    render(){
        const {scale, opacity} = this.state;
        return (
            <View style = {styles.view}>
                <Animated.Image style = {
                    {
                        flex: 1,
                        backgroundColor: color.theme,
                        opacity: opacity,
                        transform: [
                            {
                                scale: scale.interpolate({
                                    inputRange: [1, 2],
                                    outputRange: [1, 2.5],
                                })
                            }
                        ],
                    }
                }
                                source = {require('../../images/launch.png')}
                                resizeMode = 'contain'
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: color.theme,
    },
});