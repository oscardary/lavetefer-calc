import React, { useEffect } from 'react';
import AppNavigator from './src/navigation/AppNavigator';

import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler'; 
import { StyleSheet } from 'react-native';

import { crearTablaMedicamentos } from './src/database/setup';

export default function App() {

  useEffect(()=>{
    crearTablaMedicamentos();
  }, []);

  return (
    <GestureHandlerRootView style={style.container}>
      <NavigationContainer>
        <AppNavigator/>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
  }
});