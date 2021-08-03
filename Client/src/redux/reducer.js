import { CHANGE_VIDEO, SEEN_VIDEOS } from './action';
import videos from '../assets/videos';

const initialState = {
    newVideo: videos[0].name,
    seenVideos: []
}

export default function rootReducer(state = initialState, { type, payload }) {
    switch (type) {
        case CHANGE_VIDEO:
            return {
                ...state,
                newVideo: payload
            };
        case SEEN_VIDEOS:
            return {
                ...state,
                seenVideos: [...state.seenVideos, payload]
            };


        default: return state;
    }
}