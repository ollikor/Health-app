import React from 'react';
import { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { FaSearch, FaSave } from 'react-icons/fa';
import { InputGroup, FormControl,DropdownButton,Dropdown, Button, ButtonToolbar, } from 'react-bootstrap';
import '../styles/styles.css';

import { saveChannel, getChannelsFromDB, showOnHomepage, getVideos } from '../api';

import SavedModal from './savedModal';
import RemovedModal from './removedModal';
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
    show: false,
    modalShow: false,
    channelId: '',
    update: this.props.update
  }

  async componentDidMount(){
    console.log('jee');
    const channels = await getChannelsFromDB();
    this.setState({
      channels: channels
    });
    const id = this.state.channels[0].id;
    if(this.props.channel !== false){
      this.getVideos(this.props.channel);
    }else{
      this.getVideos(id)
    }
  }

  async getVideos(id) {
    const videos = await getVideos(id);
    this.setState({videos: videos});
    this.props.addSelectedChannel(id);
  }

  handleSave = async () => {
    if(this.state.saveName === '' || this.state.saveId === '') {
      this.setState({saveError: true});
    }else{
      const newItem = {
        name: this.state.saveName,
        id: this.state.saveId
      }
      const data = await saveChannel(newItem);
      if(data.data.n === 1 && data.data.ok === 1){
        this.setState({
          showSaved: true,
          saveName: '',
          saveId: ''
        });
        this.timer();
      }
    }
  }

  removed = () => {
    this.setState({showRemoved: true});
    this.timer();
  }

  timer = () => {
    setTimeout(() => {
      this.setState({showSaved: false, showRemoved: false});
    }, 1000);
  }

  render() {
    let modalClose = () => this.setState({ modalShow: false });
    return (
      <div className="col-sm-12">
      <SavedModal show={this.state.showSaved} saved={'Youtube channel added'}/>
      <RemovedModal show={this.state.showRemoved} removed={'Youtube channel removed'}/>
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
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text>Channel name and id</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl value={this.state.saveName} placeholder="Channel name" onChange={(e) => this.setState({saveName: e.target.value})} />
            <FormControl value={this.state.saveId} placeholder="Channel id" onChange={(e) => this.setState({saveId: e.target.value})} />
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
  channel: state.video.channel,
});

const mapDispatchToProps = dispatch => ({
  addSelectedChannel: channel => {dispatch({type: 'ADD_SELECTED_CHANNEL', channel})},
});

export default connect(mapStateToProps, mapDispatchToProps)(YoutubeVideos);
