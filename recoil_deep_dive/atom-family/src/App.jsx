
import './App.css'
import { RecoilRoot, useRecoilState, useRecoilValue } from 'recoil';
import { todosAtomFamily } from './atoms';

function App() {
  return <RecoilRoot>
    <Todo id={1}/>
    <Todo id={2} />
    <Todo id={2} />
    <Todo id={2} />
    <Todo id={2} />
  </RecoilRoot>
}

function Todo({id}) {
  const currentTodo = useRecoilValue(todosAtomFamily(id));
  return (
    <>
      {currentTodo.title}
      {currentTodo.description}
      <br />
    </>
  )
}

export default App


// use Atom family, when you have an array and you want particular value from the array and not 
// the complete array, using an id/input 
// it creates atom for each element of the array under the hood, and whenever you
// update that atom, only that particular item of the array gets updated and only that
// component re-renders which was using this particular item of the array