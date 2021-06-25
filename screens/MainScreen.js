import React from 'react'
import {
  View,
  Text,
  StyleSheet } from 'react-native'


//SCREEN
export default function MainScreen(){


  return(
      <View style={styles.container}>
          <Text>First commit</Text>
      </View>
    )
}

//STYLE
const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  }
})