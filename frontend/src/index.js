import React from 'react';
import App from '../src/App'
import { BrowserRouter, Route, Routes, Router } from "react-router-dom";
import { createRoot } from 'react-dom/client';

import './reset.scss'

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript

root.render(
    <div>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </div>

);
