import fetch from 'node-fetch'
import qs from 'querystring'

var get = async (url, data, callback) => {
  var param = qs.stringify(data);
  var options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  };
  url = url + '?' + param;
  let jsonValue = nil;
  try {
    let value = await fetch(url, options)
    jsonValue = value.json();
  } catch (err) {
    return Promise.reject('problem with request: ' + err.message)
  }
  return Promise.resolve(jsonValue);
};

var post = function (url, data, callback) {
  var options = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
  };
  let jsonValue = nil;
  try {
    let value = await fetch(url, options)
    jsonValue = value.json();
  } catch (err) {
    return Promise.reject('problem with request: ' + err.message)
  }
  return Promise.resolve(jsonValue);
};

export default {
  get: get,
  post: post
};
