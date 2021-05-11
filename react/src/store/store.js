import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import {
  setLocale,
  loadTranslations,
  syncTranslationWithStore,
} from 'react-redux-i18n';

import { getDefaultLocale, translations } from '../components/locales/locales';

import rootReducer from './reducers';

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

syncTranslationWithStore(store);
store.dispatch(loadTranslations(translations));
store.dispatch(setLocale(getDefaultLocale()));

export default store;
