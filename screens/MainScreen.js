import React from 'react'
import {
  View,
  StyleSheet } from 'react-native'
import Items from '../components/Items'


//SCREEN
export default function MainScreen(){


  return(
        <View style={styles.container}>
            <Items label={"Mock 1"} onPress={()=>alert('Modifier mock1')}/>
            <Items label={"Mock 2 Mock 2 Mock 2 Mock 2 Mock 2 Mock 2 Mock 2 Mock 2 Mock 2 "} onPress={()=>alert('Modifier mock2')}/>
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