import React from 'react';
import { Component } from 'react';

import '../styles/styles.css';
import { FaHourglassStart, FaUtensils } from 'react-icons/fa';

import { getLatestBodyComposition, getLatestRecipe, getChannelId } from '../api';

import Card from './card';
import VideoCard from './videoCard';

import food from '../images/food.jpg';
import body from '../images/body.jpg';



class Home extends Component {

  state = {
    latestRecipe: {},
    latestData: {},
    latestVideo: {},
  }

  async componentDidMount(){
    const [recipe, body, video] = await Promise.all([
      getLatestRecipe(),
      getLatestBodyComposition(),
      getChannelId()
    ]);

    this.setState({latestData: body, latestRecipe: recipe, latestVideo: video});
  }

  render() {
    const {
      latestData,
      latestRecipe,
      latestVideo,
    } = this.state;
    return (
      <div className="col-sm-12">
        <div className="row justify-content-center">
          <Card
            showDelete={false}
            link={`bodyComposition`}
            image={body}
            alt={"body"}
            title={"Latest body composition"}
            firstData={`Weight ${latestData.weight} kg`}
            secondData={`Fat ${latestData.fat} %`}
            thirdData={`Muscle ${latestData.muscle} kg`}
          />
          <Card
            showDelete={false}
            link={`foodRecipes/${latestRecipe._id}`}
            image={food}
            alt={"recipe"}
            title={"Latest recipe"}
            firstData={`${latestRecipe.name}`}
            secondData={`${latestRecipe.duration} min`}
            thirdData={`${latestRecipe.portions} portions`}
            iconOne={<FaHourglassStart />}
            iconSecond={<FaUtensils />}
          />
        </div>
        <div className="row justify-content-center">
          <VideoCard
            link={`youtubeVideos/${latestVideo.videoId}`}
            image={latestVideo.thumbnail}
            alt={"video"}
            title={"Latest youtube video"}
            firstData={latestVideo.channelTitle}
            secondData={latestVideo.title}
            thirdData={``}
            />
          </div>
      </div>
    );
  }
}

export default Home;
