import React from 'react';
import useLocalStorage from './hooks/useLocalStorage';

const Test = () => {
  const [num, setNum] = useLocalStorage<number>("num")
  return (
    <div className="test">
      <p>Test - {num}</p>
      <button onClick={() => setNum(Math.random())}>Click</button>
    </div>
  );
}

export default Test;