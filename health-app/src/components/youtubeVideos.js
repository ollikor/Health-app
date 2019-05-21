import React from 'react';
import { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { FaSearch, FaSave } from 'react-icons/fa';
import { InputGroup, FormControl,DropdownButton,Dropdown, Button, ButtonToolbar, } from 'react-bootstrap';
import '../styles/styles.css';

import { saveChannel, getChannelsFromDB, showOnHomepage, getVideos } from '../api';

import DeleteModal from './deleteModal';

class YoutubeVideos extends Component {

  state = {
    username: null,
    videos: null,
    thumbnails: null,
    users: null,
    userError: false,
    saveError: false,
    videoError: false,
    selected: '',
    saveName: '',
    saveId: '',
    channels: [],
    searchName: '',
    searchId: '',
    modalShow: false,
    channelId: ''
  }

  async componentDidMount(){
    const channels = await getChannelsFromDB();
    this.setState({
      channels: channels
    })
  }

  async getVideos(id) {
    const videos = await getVideos(id);
    this.setState({videos: videos});
  }

  // handleSearch = () => {
  //   // this.getVideos(id);
  //   if(this.state.username === null || this.state.selected === '') {
  //     console.log(this.state.selected);
  //     this.setState({userError: false});
  //     this.setState({ userError: true});
  //   }else{
  //     switch (this.state.selected) {
  //       case 'name': this.getuser(this.state.username);
  //         break;
  //         case 'id': this.getVideos(this.state.username);
  //           break;
  //       default:
  //         break;
  //     }
  //     // this.getuser(this.state.username);
  //     this.setState({userError: false});
  //     // this.getVideos(this.state.username)
  //   }
  // }

  handleSave = () => {
    if(this.state.saveName === '' || this.state.saveId === '') {
      this.setState({saveError: true});
    }else{
      const newItem = {
        name: this.state.saveName,
        id: this.state.saveId
      }
      saveChannel(newItem);
    }
  }

  render() {
    let modalClose = () => this.setState({ modalShow: false });
    return (
      <div className="col-sm-12">
      <DeleteModal
            title={"Remove bodycomposition"}
            description={"Are you sure that you want to remove this bodycomposition?"}
            url={'channels/'}
            move={'/youtubeVideos'}
            id={this.state.channelId}
            show={this.state.modalShow}
            onHide={modalClose}
      />
        <div className="row ">
          <ButtonToolbar>
            <DropdownButton variant="success" id="dropdown-item-button" title="Saved channels">
            {this.state.channels.length > 0 ?
            this.state.channels.map(item => (
              <Dropdown.Item key={item._id} onClick={() => this.getVideos(item.id)} as="button">{item.name}</Dropdown.Item>
            ))
            :null
            }
            </DropdownButton>
            <DropdownButton variant="primary" id="dropdown-item-button" title="Show on the home page">
            {this.state.channels.length > 0 ?
            this.state.channels.map(item => (
              <Dropdown.Item key={item._id} onClick={() => showOnHomepage(item.id)} as="button">{item.name}</Dropdown.Item>
            ))
            :null
            }
            </DropdownButton>
            <DropdownButton variant="danger" id="dropdown-item-button" title="Remove channel">
            {this.state.channels.length > 0 ?
            this.state.channels.map(item => (
              <Dropdown.Item key={item._id} onClick={() => this.setState({channelId: item._id, modalShow: true})} as="button">{item.name}</Dropdown.Item>
            ))
            :null
            }
            </DropdownButton>
          </ButtonToolbar>
          {/* <div className="radioContent">
          <p>Choose type of search</p>
            <input type="radio" name="value" value="name" onChange={(e) => this.setState({selected: e.target.value})} /> Channel name <br />
            <input type="radio" name="value" value="id" onChange={(e) => this.setState({selected: e.target.value})} /> Channel id
          </div>
          <InputGroup className="mb-3">
            <FormControl
              onChange={(e) => this.setState({username: e.target.value})}
              placeholder="Set channel name"
              aria-label="Set channel name"
              aria-describedby="basic-addon2"
            />
            <InputGroup.Append>
              <Button onClick={this.handleSearch} variant="outline-secondary"><FaSearch /></Button>
            </InputGroup.Append>
          </InputGroup>
          {this.state.videos !== null ? <p>{"Channel name: " + this.state.searchName + " " + "Channel id: " + this.state.searchId}</p>:null}
          {this.state.userError ? <p className="smallError">Set channel name and choose type of search!</p>:null} */}
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text>Channel name and id</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl placeholder="Channel name" onChange={(e) => this.setState({saveName: e.target.value})} />
            <FormControl placeholder="Channel id" onChange={(e) => this.setState({saveId: e.target.value})} />
              <InputGroup.Append>
                <Button onClick={this.handleSave} variant="outline-secondary"><FaSave /></Button>
              </InputGroup.Append>
            </InputGroup>
            {this.state.saveError ? <p className="smallError">Set channel name and id!</p>:null}
          {this.state.videoError ? <p>Ei videoita!</p>:null}
          {
            this.state.videos !== null ?
            this.state.videos.map((item, i) => (
              <div key={i} className="col-sm-12 col-md-12 col-lg-3 videoContainer">
                <NavLink className="navLinkCard" to={`/youtubeVideos/${item.video}`}>
                  <img className="videos" src={item.thumbnail} alt={'video'} />
                </NavLink>
              </div>
            ))
            :null
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  // recipes: state.recipes.recipes,
  // body: state.body.body
});

const mapDispatchToProps = dispatch => ({
  // addRecipes: recipes => {dispatch({type: 'ADD_RECIPES', recipes})},
  // addBody: (weight, fat, fatkg, muscle, date) => {dispatch({type: 'ADD_BODY', weight, fat, fatkg, muscle, date})}
});

export default connect(mapStateToProps, mapDispatchToProps)(YoutubeVideos);
