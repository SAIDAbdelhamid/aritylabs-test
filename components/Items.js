import React, { useState } from 'react'
import {
  StyleSheet,
  View,
  Dimensions } from 'react-native'
import { Button, ListItem } from 'react-native-elements'
import PropTypes from 'prop-types';

import COLORS from '../constants/theme';

//CONSTANT
const { width } = Dimensions.get('screen');

//COMPONENT
export default function Items(props){
    const [fullLabel, setFullLabel] = useState(null)
    const { label, onPress, btnName, style } = props;

    return(
        <View style={[styles.container, style]}>
            <ListItem.Swipeable
                rightContent={
                    <Button
                        title={btnName?btnName:"Modifier"}
                        buttonStyle={styles.btnContent}
                        onPress={onPress}
                    />
                }
                >
                <ListItem.Content >
                    <ListItem.Title onPress={()=>setFullLabel(!fullLabel)}>
                        {fullLabel ? label : label.length < 25 ? `${label}` : `${label.substring(0, 25)}...`}
                    </ListItem.Title>
                </ListItem.Content>
                
                <ListItem.Chevron />
            </ListItem.Swipeable>
        </View>
    )
}

Items.propTypes = {
  label: PropTypes.string,
  onPress: PropTypes.func,
  btnName: PropTypes.string
};

//STYLE
const styles = StyleSheet.create({
    container:{
        width:width*.9,
        marginTop:5,
        marginBottom:5,
        backgroundColor:COLORS.WHITE
    },
    btnContent:{ 
        minHeight: '100%', 
        backgroundColor: COLORS.PRIMARY 
    }
})