
import videos from '../assets/videos.js';
import { CHANGE_TEMPLATE, CHANGE_VIDEO, SESSION_INFO, REC_VIDEO, SEEN_VIDEO } from './action';
const template = require('../assets/level_templates/prueba.json')[2];


const initialState = {
    recVideo: [],
    template,
    videos,
    user: {
        id: '',
        Names: '',
        Surname: '',
        email: '',
        password: '',
        Contries: '',
        // Departament: '',
        // City: '',
        DateN: '',
        currentGame: {
            idGame: '',
            numVideosTarget: 100,
            numAciertos: 0,
            PromedioAciertos: 30 / 100,
            lives: 3,
            mood: '', // Estado de Animo
            seenVideos: []
        },
        TotalGames: {                    //Query
            NumVidoesViewTarget: 1000,  // Sumatoria de Videos Vistos
            NumAciertos: 30,            // Sumatoria de Aciertos de Videos Vistos
            PromedioAciertos: 30 / 100,   //  Promedio 
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
                recVideo: payload
            };

        case SESSION_INFO:
            return {
                ...state,
                user: {
                    ...state.user,
                    currentGame: {
                        ...state.user.currentGame,
                        numAciertos: payload.correctPoints,
                        lives: payload.lives
                    }
                }
            };

        case SEEN_VIDEO:
            return {
                ...state,
                user: {
                    ...state.user,
                    currentGame: {
                        ...state.user.currentGame,
                        seenVideos: [
                            ...state.user.currentGame.seenVideos,
                            payload
                        ]
                    }
                }
            };

        default: return state;
    }
}