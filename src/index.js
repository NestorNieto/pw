import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Login from './Routes/Login/Login';
import UserHome from './Routes/UserHome/UserHome';
import AdminHome from './Routes/AdminHome/AdminHome';
import Error from './Routes/Error/Error';
import CreatePost from './Routes/CreatePost/CreatePost';
import GetPost from './Routes/GetPost/GetPost';
import ProtectedRoute from './Routes/ProtectedRoute/ProtectedRoute'


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      
      <Routes>
        <Route path="/" element= {<Login/>} />
        <Route element = {<ProtectedRoute role = 'admin'/>}>
          <Route path="/create" element = {<CreatePost/>} />
          <Route path="/admin" element = {<AdminHome/>} />
        </Route>
        <Route element = {<ProtectedRoute role = 'user'/> }>
          <Route path="/user" element = {<UserHome/>} />
          <Route path="/post/:postId" element = {<GetPost/>} />
        </Route>
        <Route path="*" element = {<Error error = "La pagina no existe."/>} />
      </Routes>
      
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

//<Route path="/" element={<App />} />



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
