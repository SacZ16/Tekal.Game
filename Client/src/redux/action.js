export const CHANGE_VIDEO = "CHANGE_VIDEO";
export const CHANGE_TEMPLATE = "CHANGE_TEMPLATE";
export const REC_VIDEO = "REC_VIDEO";
export const SESSION_INFO = "SESSION_INFO";
export const SEEN_VIDEO = "SEEN_VIDEO";
export const RESET_REDUCER = "RESET_REDUCER";


export function changeVideo(newVideo) {
    return {
        type: CHANGE_VIDEO,
        payload: newVideo
    }
}

export function changeTemplate(template) {
    return {
        type: CHANGE_TEMPLATE,
        payload: template
    }
}

export function recVideo(video) {
    return {
        type: REC_VIDEO,
        payload: video
    }
}

export function seenVideos(videos, pos) {
    const videosToSeenQuote = [...videos];
    const viewVideo = videosToSeenQuote.splice(pos, 1);
    pos++;
    return {
        type: SEEN_VIDEO,
        payload: viewVideo
    }
}

export function sessionInfo(obj) {
    return {
        type: SESSION_INFO,
        payload: obj
    }
}

export function resetReducer() {
    return {
        type: RESET_REDUCER,
        payload: ''
    }
}
