/**
 * Created by watcher on 9/24/16.
 */

import { getVideosFromYoutube } from '../api/collection'

export function getVideos (e) {
    let _value = e.target.value
    return dispatch => {
        dispatch({type: 'REQUEST_VIDEO'})
        return getVideosFromYoutube(_value).then(response => {dispatch({type: 'SUCCESS_VIDEO', payload: response})})
    }
}