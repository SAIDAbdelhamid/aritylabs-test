import axios from 'axios';
import { MainConfig } from '../config/mainconfig'
import { _setStorage, _getStorage } from '../utils/storage'

const _postLogin = (email,password) => axios.post(MainConfig.ROOT_URL+`Endusers/login`,{ email, password })

const orderEffects = (effects) =>{
    if(effects){
        return(effects.sort((a, b) => a.label.localeCompare(b.label)))
    }
}

export const _getSideEffects = async () => {
    const result = await _getStorage('data')
    if (result) {
        return{
            type: "GET_SIDE_EFFECTS_SUCCESS",
            payload: result
        }
    }
    else {
        const token = (await _postLogin("ihcene+patient5@aritylabs.com","5eWbgFEG2Az")).data.id
        const data = (await axios.get(MainConfig.ROOT_URL+`side_effects?access_token=${token}`)).data
        const orderData = orderEffects(data)
        await _setStorage('data',orderData)
        return{
            type: "GET_SIDE_EFFECTS_SUCCESS",
            payload: orderData
        }
    }
};

export const _loadingSideEffects = () => {
    return{
        type: "GET_SIDE_EFFECTS"
    }
}