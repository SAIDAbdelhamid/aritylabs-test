import React from 'react'
import {
  View,
  Text,
  SectionList,
  StyleSheet } from 'react-native'
import COLORS from '../constants/theme'
import Items from '../components/Items'

//SCREEN
export default function MainScreen(){
    const DATA = [
        {
        title: "A",
        data: ["PizzaPizzaPizzaPizzaPizzaPizzaPizzaPizzaPizzaPizzaPizza", "Burger", "Risotto"]
        },
        {
        title: "B",
        data: ["French Fries", "Onion Rings", "Fried Shrimps"]
        },
        {
        title: "C",
        data: ["Water", "Coke", "Beer"]
        },
        {
        title: "D",
        data: ["Cheese Cake", "Ice Cream"]
        }
    ];

    return(
        <View style={styles.container}>
            <SectionList
                sections={DATA}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => <Items label={item} onPress={()=>alert(item)}/>}
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