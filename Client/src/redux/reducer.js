
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
    seenVideos: [],
    user: {},

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
                seenVideos: [...state.seenVideos, payload]
            };

        default: return state;
    }
}