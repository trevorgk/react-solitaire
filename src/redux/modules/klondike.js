const LOAD = 'redux-example/klondike/LOAD';
const LOAD_SUCCESS = 'redux-example/klondike/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/klondike/LOAD_FAIL';
const FLIP_CARD = 'redux-example/klondike/FLIP_CARD';

const initialState = {
  count: 0
};

export function isLoaded(globalState) {
  return globalState.klondike && globalState.klondike.loaded;
}
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    switch (action.type) {
      case LOAD:
        return {
          ...state,
          loading: true
        };
      case LOAD_SUCCESS:
        return {
          ...state,
          loading: false,
          loaded: true,
          data: action.result,
          error: null
        };
      case LOAD_FAIL:
        return {
          ...state,
          loading: false,
          loaded: false,
          data: null,
          error: action.error
        };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.klondike && globalState.klondike.loaded;
}
