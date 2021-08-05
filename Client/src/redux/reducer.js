
import videos from '../assets/videos.js';
import { CHANGE_TEMPLATE, CHANGE_VIDEO, SCORE, REC_VIDEO, SEEN_VIDEO } from './action';

const template = require('../assets/level_templates/prueba.json')[2];

const initialState = {
    recVideo: {
        infoVideo: [],
        filter: ''
    },
    template,
    videos,
    user: {
        id:'',
        Names:'',
        Surname: '',
        email:'',
        password:'',
        Contries: '',
        // Departament: '',
        // City: '',
        DateN: '',
        presentationsGames:{
            idGame:'',
            numVideosTarget: 100,
            numAciertos: 30,
            PromedioAciertos: 30/100,
            lives:3, 
            seenVideos:[
            ]
        },
        TotalGames:{                    //Query
            NumVidoesViewTarget: 1000,  // Sumatoria de Videos Vistos
            NumAciertos: 30,            // Sumatoria de Aciertos de Videos Vistos
            PromedioAciertos: 30/100,   //  Promedio 
        },
    }
}

export default function reducer(state = initialState, { type, payload }) {

    switch (type) {
        case CHANGE_VIDEO:
            return {
                ...state,
                newVideo: payload
            };

        case CHANGE_TEMPLATE:
            return {
                ...state,
                template: payload
            };

        case REC_VIDEO:
            return {
                ...state,
                recVideo: {
                    infoVideo: payload.video,
                    filter: payload.filter
                }
            };

        case SCORE:
            return {
                ...state,
                user: {
                    ...state.user,
                    correct: payload.correct,
                    incorrect: payload.incorrect
                }
            };

        case SEEN_VIDEO:
            return {
                ...state,
                user: {
                    ...state.user,
                    presentationsGames:{
                        ...state.user.presentationsGames,
                        seenVideos: [
                                    ...state.user.presentationsGames.seenVideos, 
                                    payload
                                ]
                    }
                }
            };

        default: return state;
    }
}