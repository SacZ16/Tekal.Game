export const CHANGE_VIDEO       = "CHANGE_VIDEO";
export const CHANGE_TEMPLATE    = "CHANGE_TEMPLATE";
export const REC_VIDEO          = "REC_VIDEO";


export function changeVideo(newVideo){
    return {
        type: CHANGE_VIDEO,
        payload: newVideo
    }
}

export function changeTemplate(template){
    return {
        type: CHANGE_TEMPLATE,
        payload: template
    }
}

export function recVideo(video,filter){
    return {
        type: REC_VIDEO,
        payload: {
            video,
            filter
        }
    }
}

