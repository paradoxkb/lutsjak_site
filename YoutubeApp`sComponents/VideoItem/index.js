/**
 * Created by watcher on 9/24/16.
 */
import React from 'react'

class VideoItem extends React.Component {
    render () {
        let _id = this.props.id.videoId
        let _iframeSrc = 'http://www.youtube.com/embed/' + _id + '?autoplay=0'
        return (
            <iframe width='300px' height='250px' src={_iframeSrc} style={{display: 'inline-block', margin: '5px'}}></iframe>
        )
    }
}

export default VideoItem
