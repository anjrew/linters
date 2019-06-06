import React from 'react';
import ReactDOM from 'react-dom';
import { Welcome } from './pages/welcome';
import { App } from './pages/app';
import routes from './react_utils/react_routes';


if (location.pathname === routes.welcome){  
    ReactDOM.render(
        <Welcome/>,
        document.querySelector('main')
    );
} else {
    ReactDOM.render(
        <App/>,
        document.querySelector('main')
    );
}




