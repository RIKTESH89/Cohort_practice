import { useEffect, useState } from 'react'
import './App.css'
import CardWrapper from './components/CardWrapper'
import Wrapper from './components/Wrapper';


function App() {
  const [todos,setTodo] = useState([]);

    useEffect(function(){
      setInterval(function(){
        fetch("https://sum-server.100xdevs.com/todos")
      .then(async function(res){
        const json = await res.json();
        setTodo(json.todos);
      })
      },10000)
    },[]);

  return (
    <>
      <Wrapper>
        <div>List of all Todos:</div>
      </Wrapper>
      <CardWrapper todos={todos}></CardWrapper>
    </>
  )
}

export default App
