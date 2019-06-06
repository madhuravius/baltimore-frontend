/* eslint-disable no-param-reassign */
import { mapsConstants } from '../constants';

const initialState = {
  arrests: {},
};

export default function mapsReducers(state = initialState, action) {
  switch (action.type) {
    case mapsConstants.GET_ARRESTS:
      return {
        ...state,
        data: action.data.results,
      };
    default:
      return state;
  }
}
