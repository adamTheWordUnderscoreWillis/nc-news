import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Articles from './components/Articles';
import Article from './components/Article';
import User from './components/User';


function App() {

  return (
    <>
      <Header/>
      <Routes>
      <Route path="/" element={<Articles/>} />
      <Route path="/articles/:articleId" element={<Article/>} />
      <Route path="/profile/:user" element={<User/>} />

      </Routes>
    </>
  )
}

export default App
