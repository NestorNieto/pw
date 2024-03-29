import UserHome from './Routes/UserHome/UserHome';
import AdminHome from './Routes/AdminHome/AdminHome';
import Error from './Routes/Error/Error';
import CreatePost from './Routes/CreatePost/CreatePost';
import GetPost from './Routes/GetPost/GetPost';
import Layout from './Components/Layout/Layout';
import ProtectedRoute from './Routes/ProtectedRoute/ProtectedRoute';
import { Routes, Route } from 'react-router-dom';
import Home from './Routes/Home/Home';
import Bookmarks from './Routes/Bookmarks/Bookmarks';

function App() {
  return (
    <Routes>
        <Route path="/" element= {<Home/>} />

        <Route element = {<ProtectedRoute role = 'admin'/>}>
          <Route path="/create" element = {<Layout> <CreatePost/> </Layout>} />
          <Route path="/edit/:postId" element = {<Layout> <CreatePost/> </Layout>} />
          <Route path="/admin" element = {<Layout> <AdminHome/> </Layout>} />
        </Route>
        
        <Route element = {<ProtectedRoute role = 'user'/> }>
          <Route path="/user" element = {<Layout> <UserHome/> </Layout> } />
          <Route path="/bookmarks" element = {<Layout> <Bookmarks/> </Layout> } />
          <Route path="/post/:postId" element = {<Layout> <GetPost/> </Layout>} />
        </Route>
        
        <Route path="*" element = {<Error error = "La pagina no existe."/>} />
      </Routes>
  );
}

export default App;
