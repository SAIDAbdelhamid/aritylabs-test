import React, { useContext, useEffect } from 'react'
import {
  View,
  Text,
  SectionList,
  StyleSheet } from 'react-native'
  
import COLORS from '../constants/theme'
import Items from '../components/Items'
import { Mycontext } from "../constants/context";
import { useInfinityScroll } from "../hooks/useInfinityScroll"

//SCREEN
export default function MainScreen(){
    const { state, dispatch, app } = useContext(Mycontext)

    useEffect(() => {
        async function _callApi(){
            dispatch(await app._getSideEffects());
        }
        _callApi()
    }, [])

    const formatData = (effects) => {
        const alphabetics = [
            {title:"A",data:[]},
            {title:"B",data:[]},
            {title:"C",data:[]},
            {title:"D",data:[]},
            {title:"E",data:[]},
            {title:"F",data:[]},
            {title:"G",data:[]},
            {title:"H",data:[]},
            {title:"I",data:[]},
            {title:"J",data:[]},
            {title:"K",data:[]},
            {title:"L",data:[]},
            {title:"M",data:[]},
            {title:"N",data:[]},
            {title:"O",data:[]},
            {title:"P",data:[]},
            {title:"Q",data:[]},
            {title:"R",data:[]},
            {title:"S",data:[]},
            {title:"T",data:[]},
            {title:"U",data:[]},
            {title:"V",data:[]},
            {title:"W",data:[]},
            {title:"X",data:[]},
            {title:"Y",data:[]},
            {title:"Z",data:[]}
        ]
        if(effects){
            if (effects.lenght!==0) {
                effects.map((effect) => {
                    alphabetics.map((alphabetic) => {
                        let fchar = effect.label[0];
                        if (fchar === alphabetic.title) {
                            alphabetic = {...alphabetic,data:alphabetic.data.push(effect)};
                        }
                    })
                });
            }
        }
        return alphabetics
    }

    const Screen = () =>{
        const [effect, scroll] = useInfinityScroll(state.data)

        useEffect(() => {
            scroll()
        }, [])
        
        return(
            <View style={styles.container}>
                <SectionList
                    sections={formatData(effect)}
                    onEndReachedThreshold={2}
                    onEndReached={()=>scroll()}
                    keyExtractor={(item, index) => item + index}
                    renderItem={({ item }) => <Items label={item.label} onPress={()=> scroll()}/>}
                    renderSectionHeader={({ section: { title } }) => (
                        <Text style={styles.sectionTitleContent}>{title}</Text>
                    )}
                    />
            </View>
        )
    }

    if (state.loading) {
        return(<></>)
    }
    else{
        return(<Screen/>)
    }
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