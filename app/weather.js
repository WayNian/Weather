/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {Dimensions, Image, ListView, StyleSheet, Text, View} from 'react-native';

const WEATHER_URL = 'https://free-api.heweather.com/v5/weather?city=南京&key=f4899761d4a44e85b58432df728021b1';

screenWidth = Dimensions.get('window').width;
screenHeight = Dimensions.get('window').height;

export default class weather extends Component {
    /**
     * 初始化数据
     */
    constructor(props) {
        super(props);

        this.state = {
            address: '',//地址
            todayWeather: '',//天气
            temperature: '',//温度
            quality: '',//空气质量
            bodyTem: '',//体感温度
            windDir: '',//风向
            windLevel: '',//风力等级
            hum: '',//相对湿度
            temList: [],//未来七天天气
            txt_d: '',//白天天气
            txt_n: '',//夜晚天气
            maxTem: '',//最高温度
            minTem: '',//最低温度
        }
    }

    /**
     * 加载耗时操作
     */
    componentDidMount() {
        this.getDataFromFetch();
    }

    getDataFromFetch() {
        fetch(WEATHER_URL)//请求地址
            .then((response) => response.json())//取数据
            .then((responseText) => {//处理数据
                //通过setState()方法重新渲染界面
                this.setState({
                    address: responseText.HeWeather5[0].basic.city,
                    todayWeather: responseText.HeWeather5[0].now.cond.txt,
                    temperature: responseText.HeWeather5[0].now.tmp,
                    quality: responseText.HeWeather5[0].aqi.city.qlty,
                    bodyTem: responseText.HeWeather5[0].now.fl,
                    windDir: responseText.HeWeather5[0].now.wind.dir,
                    windLevel: responseText.HeWeather5[0].now.wind.sc,
                    hum: responseText.HeWeather5[0].now.hum,
                    temList: responseText.HeWeather5[0].daily_forecast,
                })
            })
            .catch((error) => {
                console.warn(error);
            }).done();
    }

    getWeekday=(sDate)=> {
        var dt = new Date(sDate.replace(/-/g, '/'));
        var date = new Date()
        var a = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
        if (date.getDay() === dt.getDay()) {
            return '今天'
        } else if (date.getDay() === dt.getDay() - 1) {
            return '明天'
        } else {
            return a[dt.getDay()];
        }
    }


    _renderRow(rowData: string, sectionID: number, rowID: number) {
        var weekDay = this.getWeekday(rowData.date)
        return (
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: '#ffffff',
                padding: 5,
                marginTop: 1
            }}>
                <Text style={[styles.textList, {marginLeft: 10}]}>{weekDay}</Text>
                <View style={{flexDirection: 'row'}}>
                    <Image source={require('../images/sketchy_weather_27.png')}
                           style={{
                               width: 25,
                               height: 25
                           }}/>
                    <Text
                        style={styles.textList}>{rowData.cond.txt_d === rowData.cond.txt_n ? rowData.cond.txt_d : (rowData.cond.txt_d + '转' + rowData.cond.txt_n)}</Text>
                </View>
                <Text
                    style={[styles.textList, {marginRight: 10}]}>{rowData.tmp.max}°/{rowData.tmp.min}°</Text>
            </View>
        )
    }

    render() {
        return (
            <Image
                style={{
                    width: screenWidth,
                    height: screenHeight
                }}
                source={require('../images/bg.jpg')}>
                <View style={{flexDirection: 'row'}}>
                    <View style={styles.info}>
                        <Text style={styles.text}>{this.state.address}</Text>
                        <Text style={styles.temperature}>{this.state.temperature}°</Text>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={styles.text}>{this.state.todayWeather} | </Text>
                            <Text style={styles.text}>空气{this.state.quality}</Text>
                        </View>
                    </View>
                </View>
                <View style={{
                    marginTop: 100,
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center'
                }}>
                    <View style={{alignItems: 'center'}}>
                        <Text style={styles.text}>{this.state.windDir}</Text>
                        <Text style={styles.textBig}>{this.state.windLevel}</Text>
                    </View>
                    <View style={styles.viewLine}/>
                    <View style={{alignItems: 'center'}}>
                        <Text style={styles.text}>相对湿度</Text>
                        <Text style={styles.textBig}>{this.state.hum}%</Text>
                    </View>
                    <View style={styles.viewLine}/>
                    <View style={{alignItems: 'center'}}>
                        <Text style={styles.text}>体感温度</Text>
                        <Text style={styles.textBig}>{this.state.bodyTem}°</Text>
                    </View>
                </View>

                <ListView
                    dataSource={new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows(this.state.temList)}
                    renderRow={this._renderRow.bind(this)}
                    enableEmptySections={true}
                />

            </Image>
        )
    }


}

const styles = StyleSheet.create({
    info: {
        marginLeft: 20,
        marginTop: 20
    },
    text: {
        fontSize: 20,
        color: '#ffffff'
    },
    textBig: {
        fontSize: 30,
        color: '#ffffff'
    },
    textList: {
        fontSize: 20,
        color: '#666666'
    },
    temperature: {
        fontSize: 50,
        color: '#ffffff'
    },
    viewLine: {
        backgroundColor: '#ffffff',
        width: 1,
        height: 50
    }


});

