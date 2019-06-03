import axios from 'axios';
import { commonConstants, mapsConstants } from '../constants';

export function getArrestData() {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${commonConstants.BASE_URL}${mapsConstants.API_GET_ARRESTS_URL}`);
      const action = {
        type: mapsConstants.GET_ARRESTS,
        data,
      };
      dispatch(action);
    } catch (error) {
      if (error && error.response
        && commonConstants.SERVER_ERRORS.includes(error.response.status)) {
        const action = {
          type: commonConstants.HTTP_ERROR,
          e: error,
        };
        dispatch(action);
      } else {
        throw (error);
      }
    }
  };
}
