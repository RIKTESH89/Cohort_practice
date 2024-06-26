import { useState,useEffect,useRef } from 'react'
import './App.css'

function App() {

  const divRef = useRef();

  useEffect(function(){
    setTimeout(function(){
      divRef.current.innerHTML = "10"
    },5000)
  },[])

  const incomeTax = 20000;

  return (
    <>
      hi there, your income tax returns are 
      <div ref={divRef}>{incomeTax}</div>
    </>
  )
}

export default App
