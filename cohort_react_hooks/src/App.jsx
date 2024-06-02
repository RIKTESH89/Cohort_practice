import { useEffect,useState } from 'react'
import axios from "axios"
import './App.css'

function App() {
const [id,setId] = useState(1);
  return (
    <div>
      <button onClick={function(){setId(1)}}>1</button>
      <button onClick={function(){setId(2)}}>2</button>
      <button onClick={function(){setId(3)}}>3</button>
      <button onClick={function(){setId(4)}}>4</button>
      <Todo id={id}></Todo>
    </div>
  )
}

function Todo({id}){
  const [todo,setTodo] = useState({});

  useEffect(function(){
    axios.get("https://sum-server.100xdevs.com/todo?id="+id)
    .then(function(res){
      setTodo(res.data.todo);
    })
  },[id]);

  return(
    <div>
      <h1>{todo.title}</h1>
      <h2>{todo.description}</h2>
    </div>
  )
}



export default App
