import { useCallback, useEffect, useMemo, useState } from 'react'
import { memo } from 'react';

function App() {
  const [exchange1Data, setExchange1Data] = useState({});
  const [exchange2Data, setExchange2Data] = useState({});
  const [bankData, setBankData] = useState({});

  useEffect(() => {
    // Some operation to get the data
    setExchange1Data({
      returns: 100
    });
  }, [])

  useEffect(() => {
    // Some operation to get the data
    setExchange2Data({
      returns: 100
    });
  }, [])

  useEffect(() => {
    // Some operation to get the data
    setTimeout(() => {
      setBankData({
        income: 100
      });
    },5000)
  }, [])

  const cryptoReturns = useMemo(function(){
    return exchange1Data.returns + exchange2Data.returns;
  },[exchange1Data,exchange2Data]);

// const cryptoReturns = exchange1Data.returns + exchange2Data.returns;
// the above line is calculative extensive and we dont want to calculate it again after the setTimeout, because they did not changed

// useCallback is not about minimizing the amount of code that is run
// useCallback is about not rendering a child component, if the function hasnt/doesnt need to change across renders 

 
  const calculateCrypto = useCallback(function(){
    return exchange1Data.returns + exchange2Data.returns;
  },[exchange1Data,exchange2Data])
  
  const incomeTax = (cryptoReturns + bankData.income) * 0.3

  return (
    <div>
        hi there, your income tax returns are {incomeTax}
          <br />
          <CryptoGain calculateCrypto={calculateCrypto}></CryptoGain>
    </div>
  )
}

const CryptoGain = memo(function({calculateCrypto}){
  console.log("crypto child re-rendered");
  return (
  <div>
    Your Crypto returns are {calculateCrypto()}
  </div>)
})

export default App