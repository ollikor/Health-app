import React from 'react';
import { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Navigation from './components/navigation';
import Home from './components/home';
import Footer from './components/footer';
import BodyComposition from './components/bodyComposition';
import FoodRecipes from './components/foodRecipes';
import Recipe from './components/recipe';
import YoutubeVideos from './components/youtubeVideos';
import Video from './components/video';
import Error from './components/error';

import './styles/styles.css';

class App extends Component {
  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Navigation />
            <div className="content">
              <Switch>
                <Route path="/" component={Home} exact />
                <Route path="/home" component={Home} />
                <Route path="/bodyComposition" component={BodyComposition} />
                <Route path="/foodRecipes" exact component={FoodRecipes} />
                <Route path="/foodRecipes/:id" component={Recipe} />
                <Route path="/youtubeVideos" exact component={YoutubeVideos} />
                <Route path="/youtubeVideos/:id" component={Video} />
                <Route component={Error} />
              </Switch>
              <Footer />
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
