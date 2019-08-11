import React from 'react';

import { creatAppContainer, createStackNavigator } from 'react-navigation';
import { Image } from 'react-native';

import Feed from './pages/Feed';
import New from './pages/New';

import Logo from './assets/Logo.png'

export default creatAppContainer(
  createStackNavigator({
      Feed,
      New,
  },{
      defaultNavigationOptions:{
          headerTintColor: '#000',
          headerTitle: <Image style={{marginHorizontal: 20 }} source={logo} />,
          headerBackTitle: null ,
      },
      mode: 'modal'
  })  
);