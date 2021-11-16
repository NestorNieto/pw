import Login from './Routes/Login/Login';
import UserHome from './Routes/UserHome/UserHome';
import AdminHome from './Routes/AdminHome/AdminHome';
import Error from './Routes/Error/Error';
import CreatePost from './Routes/CreatePost/CreatePost';
import GetPost from './Routes/GetPost/GetPost';
import ProtectedRoute from './Routes/ProtectedRoute/ProtectedRoute';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
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
  );
}

export default App;
