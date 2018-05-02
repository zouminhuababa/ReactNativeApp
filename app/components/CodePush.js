/**
 * Created by Majt on 2017/3/29.
 */
import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import CodePush from 'react-native-code-push';
import Style from '../common/style';

@CodePush({ checkFrequency: CodePush.CheckFrequency.MANUAL })
export default class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            syncMessage: '',
        };
    }


    codePushDownloadDidProgress = (progress) => {
        this.setState({ progress });
    };

    codePushStatusDidChange = (syncStatus) => {
        switch (syncStatus) {
        case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
            this.setState({ syncMessage: "检查更新...", syncColor: Style.LOW });
            break;
        case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
            this.setState({ syncMessage: "正在下载...", syncColor: Style.LOW });
            break;
        case CodePush.SyncStatus.AWAITING_USER_ACTION:
            this.setState({ syncMessage: "等待操作...", syncColor: Style.TIP_Right });
            break;
        case CodePush.SyncStatus.INSTALLING_UPDATE:
            this.setState({ syncMessage: "安装更新...", syncColor: Style.LOW });
            break;
        case CodePush.SyncStatus.UP_TO_DATE:
            this.setState({ syncMessage: "暂无更新!", progress: false, syncColor: Style.LOW });
            break;
        case CodePush.SyncStatus.UPDATE_IGNORED:
            this.setState({ syncMessage: "取消更新!", progress: false, syncColor: Style.TIP });
            break;
        case CodePush.SyncStatus.UPDATE_INSTALLED:
            this.setState({ syncMessage: "完成安装!", progress: false, syncColor: Style.TIP_Right });
            break;
        case CodePush.SyncStatus.UNKNOWN_ERROR:
            this.setState({ syncMessage: "未知错误!", progress: false, syncColor: Style.TIP });
            break;
        default:
            console.info("codePushStatusDidChange CodePush.SyncStatus 无匹配项");
        }
    };

    componentDidMount() {
        CodePush.checkForUpdate()
            .then((update) => {
                if (update) {
                    this.setState({
                        syncMessage: '有新版本啦,请更新!',
                        syncColor: Style.APP,
                    });
                }
            });
    }

    render() {
        let progressView;
        if (this.state.progress) {
            progressView = (
                <Text style={styles.syncMessage}>已下载：{(this.state.progress.receivedBytes / 1024).toFixed(2)}K /
                    总大小：{(this.state.progress.totalBytes / 1048576).toFixed(2)}M</Text>
            );
        }

        return (
            <View style={styles.container}>
                <TouchableOpacity
                  activeOpacity={0.4}
                  style={styles.modelSetting}
                  onPress={() => {
                      CodePush.sync(
                          {
                              installMode: CodePush.InstallMode.IMMEDIATE,
                              updateDialog: {
                                  appendReleaseDescription: true,
                                  descriptionPrefix: '\n\n更新内容：\n',
                                  title: '更新',
                                  mandatoryUpdateMessage: '',
                                  mandatoryContinueButtonLabel: '更新',
                                  optionalIgnoreButtonLabel: '取消',
                                  optionalInstallButtonLabel: '下载安装',
                                  optionalUpdateMessage: 'APP发布新版本啦，请连上WIFI下载更新包！'
                              },
                          },
                                          this.codePushStatusDidChange,
                                          this.codePushDownloadDidProgress,
                                      );
                  }}
                >
                    <View style={styles.setting}>
                        <Image style={styles.icon} source={require('../res/icon/upgrade.png')} />
                        <Text style={styles.settingText}>检查更新</Text>
                    </View>
                    <View style={{ marginRight: 15 }}>
                        <Text
                          style={[styles.syncMessage, { color: this.state.syncColor }]}
                        >{this.state.syncMessage}</Text>
                        {progressView}
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center'
    },
    modelSetting: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Style.CARD_BG,
        marginTop: 0.5,
        marginBottom: 0.5,
    },
    setting: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    settingText: {
        fontSize: Style.NORMAL_SIZE,
        color: Style.MODULE,
        paddingLeft: 15,
        paddingTop: 12,
        paddingBottom: 12,
    },
    icon: {
        width: 20,
        height: 20,
        marginLeft: 15,
    },
});
