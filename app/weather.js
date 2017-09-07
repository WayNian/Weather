/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, ListView, Image} from 'react-native';

const WEATHER_URL = 'https://free-api.heweather.com/v5/weather?city=南京&key=f4899761d4a44e85b58432df728021b1';

Dimensions = require('Dimensions');
width = Dimensions.get('window').width;
height = Dimensions.get('window').height;

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
                })
            })
            .catch((error) => {
                console.warn(error);
            }).done();
    }

    render() {
        return (
            <View>
                <Text>城市：{this.state.address}</Text>
                <Text>天气：{this.state.todayWeather}</Text>
                <Text>温度：{this.state.temperature}°</Text>
                <Text>空气质量：{this.state.quality}</Text>
            </View>
        )
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

});

