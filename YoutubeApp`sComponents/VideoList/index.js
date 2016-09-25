/**
 * Created by watcher on 9/24/16.
 */
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import VideoItem from '../../components/VideoItem'
import * as collectionActions from '../../actions/CollectionActions'

class VideoList extends Component {
    constructor () {
        super()
        this.state = {videos: []}
    }
    componentWillMount () {
        document.title = 'Videos from Youtube'
    }
    componentWillReceiveProps (nextProps) {
        this.setState({videos: nextProps.videos})
    }
    render () {
        return (
            <div>
                <div className='text-xs-center'>
                    <input type='text' className='form-control' style={{margin: '0 auto', width: '30%'}} onChange={this.props.collectionActions.getVideos} />
                </div>
                {this.state.videos.map((video) => {
                    return <VideoItem {...video} key={Math.random()} />
                })}
            </div>
        )
    }
}

function mapStateToProps (state) {
    let videos = state.requestVideos.videos.items
    return {
        videos 
    }
}

function mapDispatchToProps (dispatch) {
    return {
        collectionActions: bindActionCreators(collectionActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoList)