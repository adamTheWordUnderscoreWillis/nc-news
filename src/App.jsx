import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Articles from './components/Articles';
import ArticleById from './components/Article';
import User from './components/User';


function App() {
  const [user, setUser] = useState("grumpy19")
  const [isLoading, setIsLoading] = useState(true)
  


  return (
    <>
      <Header/>
      <Routes>
      <Route path="/" element={<Articles isLoading={isLoading} setIsLoading={setIsLoading} />} />
      <Route path="/articles/:articleId" element={<ArticleById user={user} isLoading={isLoading} setIsLoading={setIsLoading}/>} />
      <Route path="/profile/:user" element={<User/>} />

      </Routes>
    </>
  )
}

export default App
