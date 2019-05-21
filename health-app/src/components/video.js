import React from 'react';
import { Component } from 'react';

import '../styles/styles.css';

import Back from './back';

class Video extends Component {
  render() {
    return (
      <div className="col-sm-12">
        <div className="row justify-content-center">
          <div className="col-sm-12 col-md-12 col-lg-12 singleVideoContainer">
            <Back url={"/youtubeVideos"} page={"Videos"} />
            <iframe
              className="videos"
              title="video"
              src={`https://www.youtube.com/embed/${this.props.match.params.id}`}
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen>
            </iframe>
          </div>
        </div>
      </div>
    );
  }
}

export default Video;
