
import './App.css'
import { RecoilRoot, useRecoilState, useRecoilStateLoadable } from 'recoil';
import { todosAtomFamily } from './atoms';

function App() {
  return <RecoilRoot>
    <Todo id={1}/>
    <Todo id={3} />
    <Todo id={2} />
    <Todo id={1} />
    <Todo id={3} />
  </RecoilRoot>
}

function Todo({id}) {
   const [todo, setTodo] = useRecoilStateLoadable(todosAtomFamily(id));
   // get a particular id item i.e., each item needs a specific backend call 
   // like we wanted here <Todo id={1}/>

   // similary if you only want value i.e., const todo, then use useRecoilValueLoadable
  //  now todo contains an object
  //  {
  //   contents 
  //   state   
  //  }

  if(todo.state=="loading"){
    return <div>loading...</div>
  }

  else if(todo.state=="hasValue"){
  return (
    <>
      {todo.contents.title}
      {todo.contents.description}
      <br />
    </>
  )
  }
  else if(todo.state=="hasError"){
    return(
      <div>Error while getting data from backend</div>
    )
  }

}

export default App
