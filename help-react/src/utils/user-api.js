import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

export {getUserPreferences};

function getUserPreferences(username) {
  const url = `${BASE_URL}/User/` + username + `/`;
  var user = {}
  var ret = axios.get(url).then((response) => response.data.data);
  console.log(ret);
  return ret;
}


