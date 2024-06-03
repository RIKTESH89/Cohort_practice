import { RecoilRoot, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import './App.css'
import { countAtom, evenSelector } from './store/count';

function App() {

  return (
    <>
      <RecoilRoot>
      <Count />
      </RecoilRoot>
    </>
  )
}

function Count (){
  return (
    <div>
      <CountRenderer></CountRenderer>
      <Buttons></Buttons>
    </div>
  )
}

function CountRenderer(){
  const count = useRecoilValue(countAtom);
  return (
    <div>
      {count}
      <br />
      <EventCountRenderer/>
    </div>
  )
}

function EventCountRenderer(){
  const isEven = useRecoilValue(evenSelector);
  return(
    <div>{!isEven ? "It is even" : null}</div>
  )
}

function Buttons(){
  const setCount = useSetRecoilState(countAtom);

  return(
    <div>
      <button onClick={function(){
        setCount(count => count+1)
      }}>Increase</button>
      <button onClick={function(){
        setCount(count => count-1)
      }}>Decrease</button>
    </div>
  )
}

export default App


// useRecoilState - can both get the value and set the value
// useRecoilValue - can get the value
// useSetRecoilValue - can set the value
// RecoilRoot, anything that uses recoil logic should be wrapped with it, not their parent
// minimum number of re-renders using recoil

// RecoilRoot,atom,useRecoilState,useRecoilValue,useSetRecoilState,selector