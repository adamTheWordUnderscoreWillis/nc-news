import { useState } from 'react'
import './App.css'
import { Routes, Route, useSearchParams } from 'react-router-dom';
import Header from './components/Header';
import Articles from './components/Articles';
import ArticleById from './components/ArticleById';
import User from './components/User';
import { Nav } from './components/Nav';
import { ErrorPage } from './components/ErrorPage';

function App() {
  const [user, setUser] = useState("grumpy19")
  const [isLoading, setIsLoading] = useState(true)
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <>
      <Header/>
      <Nav searchParams= {searchParams} setSearchParams= {setSearchParams}/>
      <Routes>
      <Route path="/" element={<Articles isLoading={isLoading} setIsLoading={setIsLoading} searchParams={searchParams}/>} />
      <Route path="/:topic" element={<Articles isLoading={isLoading} setIsLoading={setIsLoading} searchParams={searchParams}/>} />
      <Route path="/articles/:articleId" element={<ArticleById user={user} isLoading={isLoading} setIsLoading={setIsLoading}/>} />
      <Route path="/profile/:user" element={<User/>} />
      <Route path="*" element={<ErrorPage user={user}/>} />

      </Routes>
    </>
  )
}

export default App
