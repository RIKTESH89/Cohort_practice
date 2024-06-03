import { useState } from 'react'
import './App.css'
import { RevenueCardComponent } from './components/RevenueCardComponent'
import { AsideNav } from './components/AsideNav'

function App() {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div>
      <AsideNav isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}></AsideNav>
      
      <div className='grid sm:grid-cols-3 sm:ml-64 sm:w-256 p-10'>
        <RevenueCardComponent title={"Amount Pending"} orderCount={"13"} amount={"6,80,000"}></RevenueCardComponent>
      </div>
    </div>
  )
}

export default App


//use grid when you want to use the complete width, otherwise use flex