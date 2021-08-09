
/* import videos from '../assets/videos.js';
const template = require('../assets/level_templates/prueba.json')[2]; */
import { CHANGE_TEMPLATE, CHANGE_VIDEO, SESSION_INFO, REC_VIDEO, SEEN_VIDEO } from './action';

const initialState = {
    recVideo: [],
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
            mood: '', // Estado de Animo
            seenVideos: []
        }
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
                        targetFound: payload.targetFound,
                        targetNotPress: payload.targetNotPress,
                        lives: payload.lives,
                        targetVideos: payload.targetVideos
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