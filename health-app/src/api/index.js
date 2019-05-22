import axios from 'axios';


// Bodycompositions api calls

const API = '';

// Get latest bodycomposition for the homepage
export async function getLatestBodyComposition() {
    try {
      const url = 'http://localhost:8000/latestBodycomposition';
      const {data} = await axios.get(url)
      return data
    } catch (error) {
      console.log(error);
    }
}

// Get all bodycompositions for the body composition page
// and convert data to float
export async function getBodyComposition() {
  const weight = [];
  const fat = [];
  const fatkg = [];
  const muscle = [];
  const date = [];

  try {
    const url = 'http://localhost:8000/';
    const {data} = await axios.get(url)
    data.forEach(bodyData => {
      weight.push(parseFloat(bodyData.weight));
      fat.push(parseFloat(bodyData.fat));
      fatkg.push(parseFloat(bodyData.fatkg));
      muscle.push(parseFloat(bodyData.muscle));
      date.push(bodyData.date);
    });
    return { weight, fat, fatkg, muscle, date };
  } catch (error) {
    console.log(error);
  }
}

// Set body composition to database from bodycomposition page
export async function setBodyComposition(newItem) {
  try {
    const url = 'http://localhost:8000';
    const data = await axios.post(url, newItem);
    return data;
  } catch (error) {
    console.log(error);
  }
}

// Recipes api calls

// Get all recipes for the food recipes page
export async function getRecipes() {
  try {
    const url = `http://localhost:8000/recipes`;
    const {data} = await axios.get(url)
    return data
  } catch (error) {
    console.log(error);
  }
}

// Get current recipe using id for the specific recipe page
export async function getRecipe(id) {
  try {
    const url = `http://localhost:8000/recipe/${id}`;
    const {data} = await axios.get(url)
    return data
  } catch (error) {
    console.log(error);
  }
}

// Get latest recipe for the homepage
export async function getLatestRecipe() {
  try {
    const url = 'http://localhost:8000/latestRecipe';
    const {data} = await axios.get(url)
    return data
  } catch (error) {
    console.log(error);
  }
}

// Add recipe to database from foodrecipes page
export async function addRecipe(newItem) {
  try {
    const url = 'http://localhost:8000/recipes';
    const data = await axios.post(url, newItem);
    return data;
  } catch (error) {
    console.log(error);
  }
}


// Youtube videos api calls

// Save youtube channel using channel name and id
export async function saveChannel(newItem) {
  try {
    const url = 'http://localhost:8000/channels';
    const data = await axios.post(url, newItem)
    return data;
  } catch (error) {
    console.log(error);
  }
}

// Remove youtube channel using id
export async function removeChannel(urlName, id) {
  try {
    const url = `http://localhost:8000/${urlName}${id}`;
    await axios.delete(url)
  } catch (error) {
    console.log(error);
  }
}

// Save channel which latest video you want show on homepage
export async function showOnHomepage(id) {
  const newItem = {
    channelId: id,
    date: Date.now()
  }
  try {
    const url = 'http://localhost:8000/channelOnHomepage';
    await axios.post(url, newItem)
  } catch (error) {
    console.log(error);
  }
}

// Get channel id which latest video you want show on homepage
export async function getChannelId() {
  try {
    const url = 'http://localhost:8000/channelOnHomepage';
    const {data} = await axios.get(url)
    return await getVideo(data.channelId);
  } catch (error) {
    console.log(error);
  }
}

// Get all channels for the youtube videos page
export async function getChannelsFromDB() {
  try {
    const url = 'http://localhost:8000/channels';
    const data = await axios.get(url);
    return data.data;
  } catch (error) {
    console.log(error);
  }
}

// Get latest video for the homepage
export function getVideo(id) {
  const url = `https://www.googleapis.com/youtube/v3/search?key=${API}&channelId=${id}&part=snippet,id&order=date&maxResults=1`;
  return axios.get(url)
  .then((response) => {
      const thumbnail = response.data.items[0].snippet.thumbnails.high.url;
      const videoId = response.data.items.map(item => item.id.videoId);
      const channelTitle = response.data.items[0].snippet.channelTitle;
      const title = response.data.items[0].snippet.title;
      return {thumbnail, channelTitle, title, videoId};
  })
  .catch(function(error){
      console.log(error);
  });
}

// Get all videos from selected channel for the youtube page
export function getVideos(id) {
  // const result = 1;
  const url = `https://www.googleapis.com/youtube/v3/search?key=${API}&channelId=${id}&part=snippet,id&order=date&maxResults=50`;
  return axios.get(url)
  .then((response) => {
    const video = response.data.items.map(item => ({
      video: item.id.videoId,
      thumbnail: item.snippet.thumbnails.high.url
    }));
    return video;
  })
  .catch(function(error){
      console.log(error);
  });
}

// getuser = (userName) => {
//   // const url = `https://www.googleapis.com/youtube/v3/channels?key=${API}&forUsername=eeddspeaks&part=contentDetails&maxResult=5`;
//   const url = `https://www.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&forUsername=${userName}&key=${API}`;
//   // const url = `https://www.googleapis.com/youtube/v3/channels?key=${API}&forUsername=${this.state.username}&part=snippet`;
//   let users = null;
//   let id = null;
//   axios.get(url)
//   .then((response) => {
//     console.log(response);
//     console.log(response.data.items[0].id);
//     console.log(response.data.items[0].snippet.customUrl);
//       users = response.data.items;
//       if(users.length > 0) {
//         // this.getVideos(id);
//         users.map(user => (
//           id = user.id
//         ));
//         this.setState({
//           videoError: false,
//           searchName: response.data.items[0].snippet.customUrl,
//           searchId: response.data.items[0].id,
//         });
//         this.getVideos(id);
//       }else{
//         this.setState({videoError: true, videos: null});
//       }
//   })
//   .catch(function(error){
//       console.log(error);
//   });
// }