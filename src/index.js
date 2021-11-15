import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Login from './Pages/Login/Login';
import UserHome from './Pages/UserHome/UserHome';
import AdminHome from './Pages/AdminHome/AdminHome';
import Error from './Pages/Error/Error';
import CreatePost from './Pages/CreatePost/CreatePost';
import GetPost from './Pages/GetPost/GetPost';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element = {<Login/>} />
        <Route path="/user" element = {<UserHome/>} />
        <Route path="/admin" element = {<AdminHome/>} />
        <Route path="/create" element = {<CreatePost/>} />
        <Route path="/post/:postId" element = {<GetPost/>} />
        <Route path="*" element = {<Error/>} />
      </Routes>
      
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
