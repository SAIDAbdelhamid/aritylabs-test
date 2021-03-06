import React, { useContext, useEffect, useState } from 'react'
import {
  View,
  Text,
  Modal,
  SectionList,
  StyleSheet } from 'react-native'
import { Button } from 'react-native-elements'
import { Formik } from 'formik';
import * as yup from "yup";

import COLORS from '../constants/theme'
import { _setStorage } from '../utils/storage'
import Items from '../components/Items'
import { Mycontext } from "../constants/context";
import { useInfinityScroll } from "../hooks/useInfinityScroll"
import { TextInput } from 'react-native'

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
        const [modalVisible, setModalVisible] = useState({modalState:false,id:null});

        useEffect(() => {
            scroll()
        }, [])

        useEffect(() => {
            if (state.data) {
                async function _store(){
                    await _setStorage('data',state.data)
                }
                _store()
            }
        }, [state.data])
        
        return(
            <View style={styles.container}>
                <Formik
                    initialValues={{effectName:''}}
                    onSubmit={ async(values) => { dispatch(app._updateSideEffects(modalVisible.id, values.effectName)) }}
                    validateOnChange={false}
                    validationSchema={yup.object().shape({
                        effectName: yup
                            .string()
                            .required('(*) Ce champ est obligatoire')
                            .min(3, ({ min }) => `Ce champ doit contenir au moins ${min} characters`)
                      })}
                >
                    {({ handleChange, errors, handleSubmit, values }) => (
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible.modalState}
                        onRequestClose={() => {
                            setModalVisible({modalState:!modalVisible.modalState,id:null});
                        }}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <View style={styles.headerModalContainer}>
                                    <Text style={styles.titleModalContent}>L'effet secondaire</Text>
                                </View>

                                <View style={styles.bodyModalContainer}>
                                    <View style={styles.inputContainer}>
                                        <TextInput onChangeText={handleChange('effectName')} value={values.effectName} placeholder="Nom de l'effet" />
                                    </View>
                                    {(errors.effectName) && <View style={{marginHorizontal: 10,marginTop:5}}>
                                            <Text style={{color: '#E74C3C'}}>{errors.effectName.toString()}</Text>
                                        </View>}
                                </View>

                                <View style={styles.footerModalContainer}>
                                    <Button
                                        title={"Annuler"}
                                        buttonStyle={[styles.btnContent, {backgroundColor: COLORS.SECONDARY}]}
                                        onPress={()=>{setModalVisible({modalState:!modalVisible.modalState,id:null})}}
                                    />
                                    <Button
                                        title={"Modifier"}
                                        buttonStyle={[styles.btnContent, {backgroundColor: COLORS.PRIMARY}]}
                                        onPress={handleSubmit}
                                    />
                                </View>
                            </View>
                        </View>
                    </Modal>
                    )}
                </Formik>

                <SectionList
                    sections={formatData(effect)}
                    onEndReachedThreshold={2}
                    onEndReached={()=>scroll()}
                    keyExtractor={(item, index) => item + index}
                    renderItem={({ item }) => <Items label={item.label} onPress={()=> setModalVisible({modalState:true,id:item.id})}/>}
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
    },
    btnContent:{
        minHeight: '80%',
        minWidth:'40%'
    },
    footerModalContainer:{
        flex: 1, 
        flexDirection: 'row', 
        justifyContent: 'space-around', 
        alignItems: 'center', 
        width: '100%'
    },
    bodyModalContainer:{
        flex: 2, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    inputContainer:{
        height:45,
        minWidth:'90%',
        backgroundColor:COLORS.INPUT_COLOR,
        borderRadius:4,
        paddingLeft:20,
        justifyContent:'center'
    },
    headerModalContainer:{
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center',
        flex:1
    },
    titleModalContent:{
        fontSize: 18, 
        width: '100%', 
        textAlign: 'center'
    },
    modalContent:{ 
        flex: 1,
        maxHeight: 200,
        width:'90%',
        backgroundColor:'white',
        borderRadius:4
    },
    modalContainer:{
        flex:1,
        backgroundColor:'rgba(0, 0, 0, .5)',
        alignItems:'center',
        justifyContent:'center'
    }
})