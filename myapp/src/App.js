import React, { useContext } from 'react'
import './App.css';
import { BrowserRouter, Routes, Route, Navigate, } from 'react-router-dom'
import Home from './pages/Home/Home';
import Search from './pages/Search/Search';
import Single from './pages/Single/Single';
import Favoritos from './pages/Favoritos';
import CreatePost from './pages/admin/CreatePost';
import CreateUser from './pages/createUser/CreateUser';
import Message from './components/Message';

import { UserProvider } from './context/UserContext';
import Menu from './components/Menu';
import Login from './pages/login/Login';
import Profile from './pages/admin/Profile';
import NotFound from './pages/notFound/NotFound';

import { useState } from 'react'
import Agradecimento from './pages/Agradecimento';
import EditPost from './pages/admin/EditPost';
import Users from './pages/users/Users';
import Geek from './pages/genre/Geek';
import Politica from './pages/genre/Politica';
import Futebol from './pages/genre/Futebol';
import Internacional from './pages/genre/Internacional';
import Esportes from './pages/genre/Futebol';
import EditUserAdmin from './pages/admin/EditUserAdmin';
import Footer from './components/Footer';


function App() {

  return (

    <div className="App">
      <BrowserRouter>
        <UserProvider>
          <Menu />
          <Message />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/search' element={<Search />} />
            <Route path='/:slug' element={<Single />} />
            <Route path='/user/favoritos/:id' element={<Favoritos />} />
            <Route path='/create/user' element={<CreateUser />} />
            <Route path='/login' element={<Login />} />

            <Route path='/agradecimento' element={<Agradecimento />} />
            <Route path='/users/:id' element={<Users />} />
            <Route path='*' element={<NotFound />} />
            {/* User Rotas */}
            <Route path='/user/myprofile' element={<Profile />} />
            <Route path='/user/edit/post/:id' element={<EditPost />} />
            <Route path='/user/create/post' element={<CreatePost />} />
            <Route path='/user/admin/config' element={<EditUserAdmin />} />
            {/* User Rotas */}
            {/* Genero Rotas */}
            <Route path='/geek' element={<Geek />} />
            <Route path='/politica' element={<Politica />} />
            <Route path='/esportes' element={<Esportes />} />
            <Route path='/internacional' element={<Internacional />} />
            {/* Genero Rotas */}
            
          </Routes>
          
        </UserProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
