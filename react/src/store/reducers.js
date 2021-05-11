import { combineReducers } from 'redux';
import { i18nReducer } from 'react-redux-i18n';
import weatherReducer from './weatherReducer';

const rootReducer = combineReducers({ weatherReducer, i18n: i18nReducer });

export default rootReducer;
