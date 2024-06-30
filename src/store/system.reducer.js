export const LOADING_START = 'LOADING_START'
export const LOADING_START_SUGGESTED = 'LOADING_START_SUGGESTED'
export const LOADING_DONE = 'LOADING_DONE'
export const LOADING_DONE_SUGGESTED = 'LOADING_DONE_SUGGESTED'
export const TOGGLE_MODAL = 'TOGGLE_MODAL'

const initialState = {
  isLoading: false,
  isModalOpen: false
}

export function systemReducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOADING_START:
      return { ...state, isLoading: true }
    case LOADING_START_SUGGESTED:
      return { ...state, isLoading: true }
    case LOADING_DONE:
      return { ...state, isLoading: false }
    case LOADING_DONE_SUGGESTED:
      return { ...state, isLoading: false }
    case TOGGLE_MODAL:
      return { ...state, isModalOpen: !state.isModalOpen }
    default: return state
  }
}

