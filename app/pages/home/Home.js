import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    RefreshControl,
    Text,
}from 'react-native';
import CodePush from "react-native-code-push";

import HomeCell from './HomeCell';
import Index from "../../App";

let codePushOptions = {checkFrequency: CodePush.CheckFrequency.ON_APP_START}

class HomePage extends Component {
    constructor(props){
        super(props);
        this.state = {
            dataSource: [],
            loading: false,
        };
        this.page = 1;
    }

    componentWillMount(){
        this._request();
    }

    codePushDownloadDidProgress = (progress) => {
        this.setState({ progress });
    };

    codePushStatusDidChange = (syncStatus) => {
        switch (syncStatus) {
            case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
                this.setState({ syncMessage: "检查更新..."});
                break;
            case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
                this.setState({ syncMessage: "正在下载..." });
                break;
            case CodePush.SyncStatus.AWAITING_USER_ACTION:
                this.setState({ syncMessage: "等待操作..."});
                break;
            case CodePush.SyncStatus.INSTALLING_UPDATE:
                this.setState({ syncMessage: "安装更新..."});
                break;
            case CodePush.SyncStatus.UP_TO_DATE:
                this.setState({ syncMessage: "暂无更新!", progress: false});
                break;
            case CodePush.SyncStatus.UPDATE_IGNORED:
                this.setState({ syncMessage: "取消更新!", progress: false});
                break;
            case CodePush.SyncStatus.UPDATE_INSTALLED:
                this.setState({ syncMessage: "完成安装!", progress: false,});
                break;
            case CodePush.SyncStatus.UNKNOWN_ERROR:
                this.setState({ syncMessage: "未知错误!", progress: false,});
                break;
            default:
                console.info("codePushStatusDidChange CodePush.SyncStatus 无匹配项");
        }
    };

    componentDidMount(){
        CodePush.sync(
            {
                installMode: CodePush.InstallMode.IMMEDIATE,
                updateDialog:{
                    appendReleaseDescription: true,
                    optionalIgnoreButtonLabel: '稍后',
                    optionalInstallButtonLabel: '立即更新',
                    optionalUpdateMessage: '有新版本了，是否更新？',
                    title: '更新提示'
                }
            },
            this.codePushStatusDidChange,
            this.codePushDownloadDidProgress,
        );
    }

    _request = () => {
        this.setState({
            loading: true
        })
        let request = new Request(`http://www.wuhaichao.com/app/home/?page=${this.page}`, {
            method: 'GET',
            headers: ({
                'Content-Type': 'application/json'
            })
        });
        fetch(request)
            .then((response) => response.json())
            .then((json) => {
                if (json.code === 0) {
                    // js六大数据类型：number、string、object、Boolean、null、undefined
                    const datArray = json.data.list;
                    console.info('********:',datArray);
                    this.setState({
                        dataSource: datArray,
                        loading: false
                    });
                }
            }).catch((err) => {
            console.error(err);
            this.setState({
                loading: false
            })
        });
    }

    _renderItem = ({item}) => {
        return(
            <HomeCell itemInfo = {item}/>
        )
    }

    _onEndReached = (e) => {
        console.info('######', e);
        const {distanceFromEnd = 1} = e;
        if (distanceFromEnd < 0) {
            this.page += 1;
            this._request();
        }
    }

    _loadMoreItem = () => {
        return(
            <View style={styles.footLoad}>
                <Text>---已达底部---</Text>
            </View>
        )
    }

    keyExtractor = (item, index) => String(index); // 指定唯一标识

    render(){
        let progressView;

        if (this.state.progress) {
            progressView = (
                <Text style={styles.messages}>{this.state.progress.receivedBytes} of {this.state.progress.totalBytes} bytes received</Text>
            );
        }
        return(
            <View style={{flex: 1}}>
                <FlatList
                    style={styles.list}
                    data={this.state.dataSource}
                    keyExtractor={this.keyExtractor}
                    renderItem={this._renderItem}
                    refreshControl={(
                        <RefreshControl
                            title='Loading'
                            refreshing={this.state.loading}
                            onRefresh = {this._request}
                            colors={['#ffaa66', '#ff00dd','#ffffbb', '#ffff44']}
                        />
                    )
                    }
                    // 决定当距离内容最底部还有多远时触发onEndReached回调；
                    // 数值范围0~1，例如：0.5表示可见布局的最底端距离content最底端等于可见布局一半高度的时候调用该回调
                    onEndReachedThreshold={0}
                    // 当列表被滚动到距离内容最底部不足onEndReacchedThreshold设置的距离时调用
                    onEndReached={ this._onEndReached }
                    ListFooterComponent={ this._loadMoreItem }
                />
              {/*  {this.state.data_list && this.state.data_list.map((item,index) =>
                    <HomeCell key={index} dataSource={item}/>)}*/}
                {progressView}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    list: {
        marginTop: 0
    },
    footLoad: {
        height: 40,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
const Home = CodePush(codePushOptions)(HomePage);
export default Home;