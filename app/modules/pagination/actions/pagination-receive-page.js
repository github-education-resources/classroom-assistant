import {PAGINATION_RECEIVE} from "../constants"

export const receivePage = (page, data) => {
  return {
    type: PAGINATION_RECEIVE,
    id: page,
    repoIds: data.map((repo) => {
      return repo.id
    })
  }
}
