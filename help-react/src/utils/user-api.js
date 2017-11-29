import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

export {getUserPreferences, getFoodRecommendations, getActivityRecommendations, getFoodBusinessRecommendations};

function getUserPreferences(username) {
  const url = `${BASE_URL}/User/` + username + `/`;
  return axios.get(url).then((response) => response.data.data);
}

function  getFoodRecommendations(username) {
  const url = `${BASE_URL}/User/` + username + `/recommend/food/category`;
  return axios.get(url).then((response) => response.data);
}

function  getActivityRecommendations(username) {
  const url = `${BASE_URL}/User/` + username + `/recommend/activity/category`;
  return axios.get(url).then((response) => response.data);
}

function getFoodBusinessRecommendations(username, location, category) {
  const url = `${BASE_URL}/User/` + username + `/recommend/food/` + location + `/` + category;
  console.log(url);
  return axios.get(url).then((response) => response.data);
}

