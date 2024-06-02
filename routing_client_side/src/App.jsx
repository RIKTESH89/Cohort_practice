import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import Dashboard from './components/Dashboard'
import Landing from './components/Landing'

function App() {

  return (
    <div>
      <div style={{border:"2px solid black"}}>Hey There</div>
      <br /><br />
    <BrowserRouter>
    <Navigation/>
    <Routes>
      <Route path='/Dashboard' element={<Dashboard></Dashboard>}></Route>
      <Route path='/' element={<Landing></Landing>}></Route>
    </Routes>
    </BrowserRouter>
    </div>
  )
}

function Navigation(){
  
  const navigate = useNavigate();
  return(
    <div>
        <button onClick={function(){
          navigate("/")
        }}>Landing Page</button>
        <br /><br />
        <button onClick={function(){
          navigate("/Dashboard")
        }}>Dashboard</button>
        <br /><br />
  </div>
  )
  
}

export default App



// code for client side routing
// create two components , 1- landing, 2- Dashbord page
// window.location.href is used to mark the location - not a good way, it fetches everytime
// correct way for above problem - useNavigate() hook in a component which is inside in BrowserRouter