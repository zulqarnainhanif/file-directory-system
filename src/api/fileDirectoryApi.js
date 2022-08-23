import * as API from "./apiHandler"
import {
  API_END_POINTS
} from "./endpoint"

export const getFileDirectory = (path) => {
  return new Promise((resolve, reject) => {
    API.get(API_END_POINTS.getFilePath + `?path=${encodeURIComponent(path)}`)
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err);
      });
  });
}