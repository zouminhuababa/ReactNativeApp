import React, {Component} from 'react';
import {
    View,
    Modal,
    StyleSheet,
    Animated,
    Easing,
} from 'react-native';

export default class Loading extends Component {
    constructor(props){
        super(props);
        this.rotateValue = new Animated.Value(0);
        this.show = true;
        this.didAnimation = false;
    }

    componentWillUnmount() {
        this.show = false;
    }

    _rotateValue = (value) => {
        this.rotateValue.setValue(value);
    };

    _startAnimation = ()=> {
        this.didAnimation = true;
        this._rotateValue(0);
        Animated.timing(this.state.rotateValue,{
            toValue: 1,
            duration: 1000,
            easing: Easing.out(Easing.ease),
        }).start(() => {
            if (this.show) {
                this._startAnimation();
            }else {
                this.didAnimation = false;
            }
        });
    }
    render(){
        const {show = false,image = null}= this.props;
        this.show = show;
        if (show && !this.didAnimation) {
            this._startAnimation();
        }
        return(
            <Modal animationType = {'none'}
                   transparent = {true}
                   visible = {show}
            >
                <View style = {styles.loadingView}>
                    <View style = {styles.loading}>
                        <Animated.Image style = {{
                            width: 40,
                            height: 40,
                            transform: [
                                {
                                    rotateZ: this.rotateValue.interpolate({
                                        inputRange: [0,1],
                                        outputRange: ['0deg', '360deg'],
                                    }),
                                },
                            ],
                        }}
                                        source = {image || require('../images/loading.png')}
                        />
                    </View>
                </View>
            </Modal>
            )
    }
}

const styles = StyleSheet.create({
    loadingView: {
        flex: 1,
        backgroundColor: '#00000033',
        alignItems: 'center',
        justifyContent: 'center',
    },
    loading: {
        width: 70,
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        backgroundColor: '#ffffffF2',
    },
});