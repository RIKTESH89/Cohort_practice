
import './App.css'
import { RecoilRoot, useRecoilState } from 'recoil';
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
   const [todo, setTodo] = useRecoilState(todosAtomFamily(id));
   // get a particular id item i.e., each item needs a specific backend call 
   // like we wanted here <Todo id={1}/>

  return (
    <>
      {todo.title}
      {todo.description}
      <br />
    </>
  )
}

export default App
