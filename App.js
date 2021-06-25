import React from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { enableScreens } from 'react-native-screens';

import AppStack from './navigation/AppStack'
import { Mycontext } from "./constants/context";


enableScreens();

export default function App() {
  return (
    <Mycontext.Provider>
        <NavigationContainer>
            <View style={styles.container}>
              {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
              <AppStack/>
            </View>
        </NavigationContainer>
    </Mycontext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
