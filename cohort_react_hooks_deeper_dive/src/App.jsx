import { useState,memo } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import FirstMemo from './components/Header'


function App() {
const [title,setTitle] = useState("Riktesh")
  return (
    <div>
    <button style={{height:50,width:200}} onClick={function(){
      setTitle(Math.random());
    }}>Change first title</button>
      <FirstMemo title={title}></FirstMemo>
      <FirstMemo title={"Singh"}></FirstMemo>
      <FirstMemo title={"Singh"}></FirstMemo>
      <FirstMemo title={"Singh"}></FirstMemo>
      <FirstMemo title={"Singh"}></FirstMemo>
    </div>
  )
}



export default App

// Header