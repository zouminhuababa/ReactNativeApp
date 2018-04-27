import React , {Component} from 'react';
import {
    View,
    StyleSheet,
    Animated,
    Easing,
    Modal,
    Text,
} from 'react-native';

export default class Toast extends Component {
    constructor(props) {
        super(props);
        this.state = {
            opacity: new Animated.Value(0),
        };
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer)
    }

    _setOpacity = (value) =>{
        this.setState(
            (state)=>{
               state.opacity.setValue(value);
               return state
            }
        )
    }
    _startAnimation = () => {
        this.did_end_show = false;
        Animated.timing(
            this.state.opacity,
            {
                toValue: 1,
                duration: 200,
                easing: Easing.out(Easing.linear)
            }
        ).start(()=>{
            const { duration } = this.props;
            this.timer = setTimeout(() => {
                this._setOpacity(1);
                Animated.timing(this.state.opacity,{
                    toValue:0,
                    duration: 200,
                    easing: Easing.out(Easing.linear)
                }).start(()=>{
                    this._setOpacity(0);
                    const {onHide = null} = this.props;
                    if (onHide){
                        onHide && onHide();
                    }else {
                        this.modal.visible = false;
                    }
                }
                )
            }, duration || 2500);
        })
    }

    render(){
        const {message = null } = this.props;
        let visible = message !== null && message !== '';
        visible && this._startAnimation();
        return (
            <Modal
                ref={(ref)=>{
                    this.modal = ref
                }}
                transparent = {true}
            >
                <View style = {styles.toast}>
                    <Animated.View style = {[styles.message, {opacity: this.state.opacity,}]}>
                        <Text style = {styles.text}>
                            {message}
                        </Text>
                    </Animated.View>
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    toast: {
        flex: 1,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
    },
    message: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#000000B2',
        borderRadius: 5,
    },
    text: {
        color: 'white',
        fontSize: 14,
    },
});