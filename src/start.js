import React from 'react';
import ReactDOM from 'react-dom';
import routes from './react_utils/react_routes';
import { init as initSocket } from './react_utils/socket';

// PAGES
import { Welcome } from './pages/welcome';
import App from './pages/app';

// REDUX SHIT
import reducer from './react_utils/redux/reducers';
import { createStore, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
const store = createStore(reducer, composeWithDevTools(applyMiddleware(reduxPromise)));

let elem;
if (location.pathname === routes.welcome) {
    elem = <Welcome />; 
} else {
    initSocket(store);
    elem = <Provider store={store}>
        <App />
    </Provider>;
}

ReactDOM.render(elem, document.querySelector('main'));
