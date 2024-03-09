// app/navigation/AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CameraScreen from '../screens/CameraScreen';
import ResultScreen from '../screens/ResultScreen';
import { View } from 'react-native';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <View>
      <Stack.Navigator initialRouteName="CameraScreen" headerMode="none">
        <Stack.Screen name="CameraScreen" component={CameraScreen} />
        <Stack.Screen name="ResultScreen" component={ResultScreen} />
      </Stack.Navigator>
    </View>
  );
};

export default AppNavigator;
