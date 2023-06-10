import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import store from './app/store';
import App from './App';
import './index.less';

if (module && module.hot) {
    module.hot.accept();
}

const root = document.getElementById('root')!;

ReactDOM.createRoot(root).render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);
