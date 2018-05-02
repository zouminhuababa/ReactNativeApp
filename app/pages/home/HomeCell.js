import React , {Component} from 'react';
import {
    View,
    Image,
    Text,
    StyleSheet,
    TouchableHighlight,
} from 'react-native';

import API from '../../api/api';

export default class HomeCell extends Component {
    constructor(props){
        super(props)
    }
    render(){
         const item = this.props.itemInfo;
        // const item = this.props.dataSource;
        return(
            <TouchableHighlight onPress = {()=>console.info('press')}>
                <View style={styles.item}>
                    <View style = {styles.topsegv}/>
                    <View style={styles.topv}>
                        <Image style={styles.userImg}
                               source={{uri: API.mainUrl + item.userIcon}}/>
                        <Text style={styles.author}>{item.author}</Text>
                        <Text style={styles.date}>{item.date}</Text>
                    </View>
                    <View style={styles.bottomv}>
                        <View style = {styles.bottomLeft}>
                            <Text style = {styles.title} numberOfLines = {2}>{item.title}</Text>
                            <Text style = {styles.content} numberOfLines = {2}>{item.detail}</Text>
                        </View>
                        <Image style = {styles.logoImg}
                               source = {{uri: API.mainUrl + item.logoUrl}}
                        />
                    </View>
                    <View>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: 'white',
        paddingTop: 0,
        paddingBottom: 10
    },
    topsegv: {
        backgroundColor: '#F4F6F9',
        height: 15,
    },
    topv: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 25,
    },
    userImg: {
        height: 30,
        width: 30,
        marginLeft: 20,
        borderRadius: 15,
    },
    author: {
        marginLeft: 8,
    },
    date: {
        textAlign: 'right',
        marginRight: 20,
        color: '#8D9DA0',
        flexGrow: 1 // flexGrow属性定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。
    },
    bottomv: {
        flexDirection: 'row',
        paddingTop: 20,
        paddingRight: 20,
        height: 110,
    },
    bottomLeft: {
        flexDirection: 'column',
        paddingLeft: 20,
        paddingRight: 10,
        flexShrink: 1,
        height: 90,
    },
    title: {
        fontSize: 17,
        color: 'black',
        fontWeight: 'bold',
    },
    content: {
        marginTop: 8,
        fontSize: 14,
        color: '#647079',
        flex: 1,

    },
    logoImg: {
        height: 90,
        width: 90,
        borderRadius: 3,
        flexShrink: 0, // 属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。
    },
    bottombar: {
        flexDirection: 'row',
        marginTop: 10,
        paddingLeft: 20,
        paddingRight: 20,
        alignItems: 'center',
        backgroundColor: 'green'
    },
})