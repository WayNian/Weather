/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

const ONE_URL = 'http://v3.wufazhuce.com:8000/api/onelist/idlist/?channel=wdj&version=4.0.2&uuid=ffffffff-a90e-706a-63f7-ccf973aae5ee&platform=android';

export default class article extends Component {
    constructor(props){
        super(props)
        this.state={
            value:''
        }
    }

    getWeather() {
        fetch(ONE_URL)
            .then((response) => response.json())
            .then((jsonData) => {
                this.setState({
                    value:jsonData.res
                })
            })
            .catch((error) => {
                alert(`fetchDataId:${error}`);
            });
    }

    render() {
        return (
            <TouchableOpacity style={styles.container}
                              onPress={()=>{
                                  this.fetchDataId()
                              }}>
                <Text style={styles.welcome}>
                    网络获取{this.state.value}
                </Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },

});

