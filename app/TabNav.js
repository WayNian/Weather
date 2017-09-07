import React, {Component} from 'react';
import {Image, StyleSheet, View} from 'react-native'
import TabNavigator from 'react-native-tab-navigator'

import Weather from './weather'
import Article from './article'
import Map from './map'
import Setting from './setting'

let weatherNormal = require('../images/weather_normal.png')
let weatherSelected = require('../images/weather_slelected.png')
let articleNormal = require('../images/article_normal.png')
let articleSelected = require('../images/article_selected.png')
let mapNormal = require('../images/map_normal.png')
let mapSelected = require('../images/map_selected.png')
let settingNormal = require('../images/setting_normal.png')
let settingSelected = require('../images/setting_selected.png')

export default class TabNav extends Component {

    constructor(props) {
        super(props)
        this.state = {
            selectedTab: '天气',
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TabNavigator>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === '天气'}
                        title="天气"
                        titleStyle={styles.tabText}
                        selectedTitleStyle={styles.selectedTabText}
                        renderIcon={() => <Image style={styles.icon} source={weatherNormal}/>}
                        renderSelectedIcon={() => <Image style={styles.icon}
                                                         source={weatherSelected}/>}
                        onPress={() => this.setState({selectedTab: '天气'})}>
                        <Weather/>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === '文章'}
                        title="文章"
                        titleStyle={styles.tabText}
                        selectedTitleStyle={styles.selectedTabText}
                        renderIcon={() => <Image style={styles.icon} source={articleNormal}/>}
                        renderSelectedIcon={() => <Image style={styles.icon}
                                                         source={articleSelected}/>}
                        onPress={() => this.setState({selectedTab: '文章'})}>
                        <Article/>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === '地图'}
                        title="地图"
                        titleStyle={styles.tabText}
                        selectedTitleStyle={styles.selectedTabText}
                        renderIcon={() => <Image style={styles.icon} source={mapNormal}/>}
                        renderSelectedIcon={() => <Image style={styles.icon}
                                                         source={mapSelected}/>}
                        onPress={() => this.setState({selectedTab: '地图'})}>
                        <Map/>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === '设置'}
                        title="设置"
                        titleStyle={styles.tabText}
                        selectedTitleStyle={styles.selectedTabText}
                        renderIcon={() => <Image style={styles.icon} source={settingNormal}/>}
                        renderSelectedIcon={() => <Image style={styles.icon}
                                                         source={settingSelected}/>}
                        onPress={() => this.setState({selectedTab: '设置'})}>
                        <Setting/>
                    </TabNavigator.Item>
                </TabNavigator>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    tabText: {
        color: "#BFBFBF",
        fontSize: 13
    },
    selectedTabText: {
        color: "#1296DB",
        fontSize: 13
    },
    icon: {
        width: 20,
        height: 20
    }
});
