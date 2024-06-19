import React from 'react'
import"./index.css"
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import PageDetail from './PageDetail';


function App() {
  return (
    <>
    <Routes>
      <Route exact path='/' Component={Home} ></Route>
      <Route exact path='/more/:id' Component={PageDetail} ></Route>
    </Routes>
    </>
  )
}

export default App
