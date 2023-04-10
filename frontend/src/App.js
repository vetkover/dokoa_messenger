import React, { Component } from 'react';
import AppRoutes from './AppRoutes';
import { BrowserRouter, Route, Routes, Router } from "react-router-dom";
//static displayName = App.name;
const App = () => {
    return (
            <Routes>
                {AppRoutes.map((route, index) => {
                    const { element, ...rest } = route;
                    return <Route key={index} {...rest} element={element} />;
                })}
            </Routes>
    );
}

export default App;