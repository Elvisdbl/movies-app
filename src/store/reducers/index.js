import {
    combineReducers
} from 'redux';

import searchTermReducer from './searchTermReducer';
import toggleResultsBar from './toggleResultsBar';

const allReducers = combineReducers({
    searchTermReducer,
    toggleResultsBar
});

export default allReducers;