import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import * as reducers from './reducers';

const rootReducer = combineReducers({
  maps: reducers.mapsReducers.default,
  common: reducers.commonReducers.default,
});

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
export const store = createStoreWithMiddleware(rootReducer, composeWithDevTools());
