import { ASSIGNMENT_ERROR_INFO } from "../constants"

export const errorInfo = (e) => {
  return {
    type: ASSIGNMENT_ERROR_INFO,
    error: e
  }
}
