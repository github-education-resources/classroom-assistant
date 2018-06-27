import {RECEIVE_METADATA} from "../constants"

export const receiveMetadata = (page, nextPageURL) => {
  return {
    type: RECEIVE_METADATA,
    id: page,
    nextPageURL: nextPageURL,
  }
}
