import React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Carousel from './src/components/carousel/Carousel';
import GmailLogin from './src/components/login/GmailLogin';
import SplashScreen from './src/components/splash/SplashScreen';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen
          name="SplashScreen"
          options={{headerShown: false}}
          component={SplashScreen}
        />
        <Stack.Screen
          name="Carousel"
          options={{headerTitleAlign: 'center', headerShadowVisible: false}}
          component={Carousel}
        />
        <Stack.Screen name="GmailLogin" component={GmailLogin} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
