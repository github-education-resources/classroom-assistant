import {RECEIVE_PAGE} from "../constants"

export const receivePage = (page, data) => {
  return {
    type: RECEIVE_PAGE,
    id: page,
    repoIds: data.map((repo) => {
      return repo.id
    })
  }
}
