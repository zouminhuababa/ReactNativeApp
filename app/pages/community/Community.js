import React,{ Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    FlatList,
    RefreshControl,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import { Carousel, WingBlank } from 'antd-mobile';

import GridView from '../../components/whc-grid-view';
import CommunityCell from './community-cell';
import RES from '../../images/index';
import API from '../../api/api';

const { width } = Dimensions.get('window');

export default class Community extends Component {
    constructor(props){
        super(props);
        this.state = {
            dataSource: [],
            loading: true
        };
        this.grid_menu = [
            {title: '本周最热',image: RES.community_hot},
            {title: '收藏集',image: RES.community_collect},
            {title: '线下活动',image: RES.community_active},
            {title: '专栏',image: RES.community_column},
        ];
        this.datas = []
    }

    componentDidMount(){
        this._startRequest();
    }

    _startRequest = () => {
        let request = new Request('http://www.wuhaichao.com/app/community/',{
            method: 'GET',
            headers: ({
                'ContentType' : 'application/json'
            })
        });
        fetch(request)
            .then((response) => response.json())
            .then((json)=>{
                if (json.code === 0) {
                    this.datas.push(json.data.banner);
                    this.datas.push(this.grid_menu);
                    this.datas.push({});
                    this.datas = this.datas.concat(json.data.hot_article);
                    this.setState({
                        dataSource: this.datas
                    })
                    console.info('>>>>>>>>>>>>>>', this.datas);
                }
                this.setState({
                    loading: false
                })
            }).catch((error)=>{
                console.info(error)
        })

    }

    _clickTopItem = (index,item = null) => {
        console.info(index)
    }

    _renderItem = ({item,index}) => {
        switch (index){
            case 0:{
                const {navigate}= this.props.navigation;
                return(
                        <Carousel
                            autoplay
                            infinite
                            selectedIndex={0}
                        >
                            {item.map((val, index) => (
                                <TouchableOpacity key={index} onPress={() => navigate('Webv', {title: '百度一下', linkUrl: item[index].link_url})}>
                                        <Image resizeMode='contain'
                                               style={{ width,height: 100}}
                                               source={{uri: API.mainUrl + val.image_url}}/>
                                </TouchableOpacity>
                            ))}
                        </Carousel>
                )
            }
            case 1:{
                return(
                    <GridView
                        style = {styles.grid}
                        column={4}
                        data={item}
                        renderItem={(item, index) => (
                            <TouchableOpacity
                                key = {index}
                                onPress = {() => {this._clickTopItem(index)}}
                                underlayColor = {'transparent'}>
                                <View style = {styles.item}>
                                    <Image style = {styles.itemImage} source = {item.image}/>
                                    <Text style = {styles.itemText}>{item.title}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                )
            }
            case 2:{
                return(
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        backgroundColor: 'white',
                        marginTop: 15,
                        height: 50,
                        paddingHorizontal: 10,
                        width
                    }}>
                        <View style={{
                            flexDirection: 'row'
                        }}>
                            <Image resizeMode="contain"
                                   source={RES.community_hot}
                                   style={{width: 20,height: 20}}/>
                            <Text style={{
                                marginLeft: 15,
                                fontSize: 14,
                                color: 'black',
                                // flexGrow: 2,
                            }}>热门文章</Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            width: 100
                        }}>
                            <Image resizeMode="contain"
                                   source={RES.community_set}
                                   style={{width: 20,height: 20}}/>
                            <Text style={{
                                marginLeft: 15,
                                fontSize: 14,
                                color: 'gray',
                            }}>定制热门</Text>
                        </View>
                    </View>
                )
            }
            default:{
                return(
                    <CommunityCell item = {item} click = {() => {
                        this._clickTopItem(4,item)
                    }}/>
                )
            }
        }
    }

    keyExtractor = (item, index) => String(index); // 指定唯一标识

    render(){
        return(
            <View style={{flex: 1}}>
                <FlatList
                    style={{flex: 1}}
                    keyExtractor={this.keyExtractor}
                    data={this.state.dataSource}
                    renderItem={this._renderItem}
                    refreshControl={(
                        <RefreshControl
                            title='Loading'
                            refreshing={this.state.loading}
                            onRefresh = {this._startRequest}
                            colors={['#ffaa66', '#ff00dd','#ffffbb', '#ffff44']}
                        />
                    )
                    }
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    grid: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white',
    },
    item: {
        width: 80,
        justifyContent: 'center',
        alignItems: 'center',
        flexShrink: 1
    },
    itemImage: {
        width: 30,
        height: 30,
    },
    itemText: {
        fontSize: 18,
        color: 'black',
        textAlign: 'center'
    }
})