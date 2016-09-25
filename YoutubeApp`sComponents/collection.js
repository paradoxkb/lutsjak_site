/**
 * Created by watcher on 9/24/16.
 */

import axios from 'axios'

export function getVideosFromYoutube (string) {
    return axios.get('https://www.googleapis.com/youtube/v3/search?part=id%2C+snippet&maxResults=5&q=' + string + '&key=AIzaSyD-QUB-6R6RioLnfvdfKTlWWXFOz6n-bTg').then(response => {
        return response.data})
}