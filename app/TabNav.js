import React, {Component} from 'react';
import {Image, StyleSheet} from 'react-native'
import {TabNavigator} from 'react-navigation'
import weather from './weather'
import article from './article'
import map from './map'
import setting from './setting'

let weatherNormal = require('../images/weather_normal.png')
let weatherSelected = require('../images/weather_slelected.png')
let aricleNormal = require('../images/article_normal.png')
let aricleSelected = require('../images/article_selected.png')
let mapNormal = require('../images/map_normal.png')
let mapSelected = require('../images/map_selected.png')
let settingNormal = require('../images/setting_normal.png')
let settingSelected = require('../images/setting_selected.png')