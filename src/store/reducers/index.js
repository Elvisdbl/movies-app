import {
    combineReducers
} from 'redux';

import searchTermReducer from './searchTermReducer';

const allReducers = combineReducers({
    searchTermReducer
});

export default allReducers;