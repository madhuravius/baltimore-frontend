/* eslint-disable no-param-reassign */
import { commonConstants } from '../constants';

const initialState = {
  error: {},
};

export default function mapsReducers(state = initialState, action) {
  switch (action.type) {
    case commonConstants.HTTP_ERROR:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
}
