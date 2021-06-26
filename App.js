import React, { useReducer } from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { enableScreens } from 'react-native-screens';
import { sideEffectReducer, INITIAL_STATE } from './reducer/reducers'
import { _getSideEffects, _loadingSideEffects } from './action/actions'

import AppStack from './navigation/AppStack'
import { Mycontext } from "./constants/context";


enableScreens();

export default function App() {
  const [state, dispatch] = useReducer(sideEffectReducer, INITIAL_STATE);

  return (
    <Mycontext.Provider value={ { state, dispatch, app : {_getSideEffects:_getSideEffects, _loadingSideEffects:_loadingSideEffects}}}>
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
