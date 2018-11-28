import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Dashboard from './components/Dashboard';
import registerServiceWorker from './registerServiceWorker';
import store from './store'

import './index.css';
import 'react-dates/lib/css/_datepicker.css';

ReactDOM.render(<Provider store={store}>
    <Dashboard />
</Provider>, document.getElementById('root'));

registerServiceWorker();
