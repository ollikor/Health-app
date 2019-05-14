import React from 'react';
import { Component } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';

import { InputGroup, FormControl, ButtonToolbar, Button, } from 'react-bootstrap';
import '../styles/styles.css';

const API = 'AIzaSyADl_s7oenqkBSgXWUZ73t-aeMO7ElBzTs';
const channelsID = 'UCXgGY0wkgOzynnHvSEVmE3A';
const result = 10;

// var finalURL = `https://www.googleapis.com/youtube/v3/search?key=${API}&channelId=${channelsID}&part=snippet,id&order=date&maxResults=${result}`;
// var finalURL = `https://www.googleapis.com/youtube/v3/search?key=${API}&channelId=UC_x5XG1OV2P6uZZ5FSM9Ttw&part=snippet,id&order=date&maxResults=${result}`;
// var getChannelId = `https://www.googleapis.com/youtube/v3/channels?key=${API}&forUsername=${this.state.username}&part=contentDetails&maxResult=5`;

class Home extends Component {

  state = {
    data: null,
    users: null,
    error: false
  }

  componentDidMount(){
    // this.getVideos();
  }

  handleSubmit = () => {
    // this.getVideos();
    this.getuser();
  }

  getVideos = (id) => {
    console.log('id');
    console.log(id);
    const url = `https://www.googleapis.com/youtube/v3/search?key=${API}&channelId=${id}&part=snippet,id&order=date&maxResults=${result}`;
    axios.get(url)
    .then((response) => {
        console.log(response.data);
        const videoId = response.data.items.map(item => item.id.videoId);
        this.setState({data: videoId})
    })
    .catch(function(error){
        console.log(error);
    });
  }

  getuser = () => {
    const url = `https://www.googleapis.com/youtube/v3/channels?key=${API}&forUsername=${this.state.username}&part=contentDetails&maxResult=5`;
    let users = null;
    let id = null;
    axios.get(url)
    .then((response) => {
        console.log(response.data.items);
        users = response.data.items;
        if(users.length > 0) {
          // this.getVideos(id);
          users.map(user => (
            id = user.id
          ));
          this.setState({ error: false });
          this.getVideos(id);
        }else{
          this.setState({error: true, data: null});
        }
    })
    .catch(function(error){
        console.log(error);
    });
  }

  render() {
    // console.log(finalURL);
    // console.log(finalURL2);
    return (
      <div className="col-sm-12">
        <div className="row justify-content-center">
          <InputGroup size="default" className="mb-3">
            <FormControl onChange={(e) => this.setState({username: e.target.value})} type="text" placeholder="Set name" aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
          </InputGroup>
          <ButtonToolbar>
            <Button className="saveRecipe" onClick={this.handleSubmit} variant="secondary" size="mg" active>
              Save
            </Button>
          </ButtonToolbar>
        </div>
        {this.state.error ? <p>Ei videoita!</p>:null}
        {this.state.data !== null ?
        this.state.data.map((item, i) => (
          <div key={i}>
            <iframe
              title="video"
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${item}`}
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen>
            </iframe>
          </div>
            ))
        :null
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  recipes: state.recipes.recipes,
  body: state.body.body
});

const mapDispatchToProps = dispatch => ({
  addRecipes: recipes => {dispatch({type: 'ADD_RECIPES', recipes})},
  addBody: (weight, fat, fatkg, muscle, date) => {dispatch({type: 'ADD_BODY', weight, fat, fatkg, muscle, date})}
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
