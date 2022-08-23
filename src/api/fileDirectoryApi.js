import * as API from "./apiHandler"
import {
  API_END_POINTS
} from "./endpoint"

export const getFileDirectory = (path) => {
  return API.get(API_END_POINTS + `?path=${path}`)
}