import App from "./App";
import React from "react";
import ReactDOM from 'react-dom';
import {applyMiddleware, createStore} from "redux";
import {AsteroidsGame} from "./store/reducer.ui";
import {Provider} from "react-redux";
import logger from 'redux-logger'
import ReduxThunk from 'redux-thunk';

const store = createStore(
    AsteroidsGame,
    applyMiddleware(logger, ReduxThunk)
);

ReactDOM.render(<Provider store={store}>
    <App/>
</Provider>, document.getElementById('root'));