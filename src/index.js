import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css'
import {store} from "./components/redux/store";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom"
import {ToastContainer,toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
            <ToastContainer/>
        </BrowserRouter>
    </Provider>

);

