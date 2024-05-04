import {createStore,combineReducers,applyMiddleware} from "redux";
import {logger} from "redux-logger/src";
import XodimlarReducer from "./reducers/XodimlarReducer";
import CategoryReducer from "./reducers/CategoryReducer";
export const store = createStore(combineReducers({
    XodimlarReducer,
    CategoryReducer
    }),
    applyMiddleware(logger))