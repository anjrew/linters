import React from 'react';
import ReactDOM from 'react-dom';
import { Welcome } from './pages/welcome';
import { App } from './pages/app';
import routes from './react_utils/react_routes';

// REDUX SHIT
import reducer from './react_utils/redux/reducers';
import { createStore, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
const store = createStore(reducer, composeWithDevTools(applyMiddleware(reduxPromise)));

if (location.pathname === routes.welcome){ 
    ReactDOM.render(
        <Welcome/>,
        document.querySelector('main')
    );
} else {
    ReactDOM.render(
        <Provider>
            <App/>
        </Provider>
        ,
        document.querySelector('main')
    );
}
