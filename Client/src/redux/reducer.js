
import videos from '../assets/videos.js';
import {CHANGE_TEMPLATE, CHANGE_VIDEO, recVideo, REC_VIDEO} from './action';

const template = require('../assets/level_templates/prueba.json')[2];

const initialState = {
    recVideo: {
        infoVideo:[],
        filter: ''
    },
    template,
    videos,
    usuario:[
        
    ]
}

export default function reducer(state = initialState, {type, payload}){
    
    switch(type){
        case CHANGE_VIDEO:
            return{
                ...state,
                newVideo: payload
            };
        
        case CHANGE_TEMPLATE:
            return{
                ...state,
                template: payload
            };

        case REC_VIDEO:
            return{
                ...state,
                recVideo:{
                    infoVideo: payload.video,
                    filter: payload.filter
                } 
            };
        
        default: return state;
    }
}