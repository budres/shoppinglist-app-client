import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ListDetail from './routes/list-detail';
import { useEffect, useState } from 'react';
import Login from './routes/login';
import Register from './routes/register';
import ShoppingLists from './bricks/list/Provider';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                {/* Redirect from root to /shopping-lists */}
                <Route path="/" element={<Navigate to="/shopping-lists" />} />
                <Route path="/shopping-lists" element={<ShoppingLists />} />
                <Route path="/shopping-lists/:id" element={<ListDetail />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
