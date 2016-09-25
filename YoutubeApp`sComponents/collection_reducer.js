/**
 * Created by watcher on 9/24/16.
 */

let initialState = {
    videos: []
}

export function requestVideos (state = initialState, action) {
    switch (action.type) {
        case 'REQUEST_VIDEO':
            return {...state}
        case 'SUCCESS_VIDEO':
            return {...state, videos: action.payload}
        case 'FAILURE_VIDEO': 
            return {...state}
        default:
            return {...state}
    }
}