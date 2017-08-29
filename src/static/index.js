import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import Routes from './routes/Routes';
import 'antd/dist/antd.min.css';
import 'nprogress/nprogress.css';


ReactDOM.render(<Routes />, document.getElementById('main'));
