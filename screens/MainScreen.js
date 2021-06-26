import React, { useContext, useEffect } from 'react'
import {
  View,
  Text,
  SectionList,
  StyleSheet } from 'react-native'
import COLORS from '../constants/theme'
import Items from '../components/Items'
import { Mycontext } from "../constants/context";

//SCREEN
export default function MainScreen(){
    const { state, dispatch, app }= useContext(Mycontext)

    useEffect(() => {
        async function _callApi(){
            dispatch(app._loadingSideEffects());
            dispatch(await app._getSideEffects())
        }
        _callApi()
      }, [])
    

    return(
        <View style={styles.container}>
            <SectionList
                sections={state.data}
                onEndReachedThreshold={0.5}
                onEndReached={() => {
                    console.log('1')
                  }}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => <Items label={item.label} onPress={()=> console.log(item.label)}/>}
                renderSectionHeader={({ section: { title } }) => (
                    <Text style={styles.sectionTitleContent}>{title}</Text>
                )}
                />
        </View>
    )
}

//STYLE
const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems:'center'
    },
    sectionTitleContent: {
        fontSize: 24,
        color:COLORS.SECONDARY
    }
})