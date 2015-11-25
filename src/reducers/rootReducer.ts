/// <reference path='../../typings/redux/redux.d.ts'/>

import { combineReducers } from 'redux';

import cards from './cards';

const rootReducer = combineReducers({
  todos: todos
});

export { rootReducer };
