import React, {FunctionComponent} from 'react';
import './App.css';
import {HashRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import UserDashboardPage from "./container/UserDashboard";
import LoginPage from "./container/LoginPage";
import RegistrationPage from "./container/RegistrationPage";

const App: FunctionComponent = () => {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate replace to="/login"/>}/>
                <Route path={"/login"} element={<LoginPage/>}/>
                <Route path={"/dashboard"} element={<UserDashboardPage/>}/>
                <Route path={"/dashboard/service/:url"} element={<UserDashboardPage/>}/>
                <Route path={"/register"} element={<RegistrationPage/>}/>
            </Routes>
        </Router>
    )
}

export default App;
