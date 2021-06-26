import axios from 'axios';
import { MainConfig } from '../config/mainconfig'

const _postLogin = (email,password) => axios.post(MainConfig.ROOT_URL+`Endusers/login`,{ email, password })

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
    
    effects.map((effect) => {
        alphabetics.map((alphabetic) => {
            let fchar = effect.label[0];
            if (fchar === alphabetic.title) {
                 alphabetic = {...alphabetic,data:alphabetic.data.push(effect)};
              }
        })
      });

    return alphabetics
  }

export const _getSideEffects = async () => {
    const token = (await _postLogin("ihcene+patient5@aritylabs.com","5eWbgFEG2Az")).data.id
    const data = (await axios.get(MainConfig.ROOT_URL+`side_effects?access_token=${token}`)).data
    
    return{
        type: "GET_SIDE_EFFECTS_SUCCESS",
        payload: formatData(data)
    }
};

export const _loadingSideEffects = () => {
    return{
        type: "GET_SIDE_EFFECTS"
    }
}