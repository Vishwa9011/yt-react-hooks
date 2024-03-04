import useLocalStorage from "./hooks/useLocalStorage";

const Other = () => {
  const [num, setNum] = useLocalStorage<number>("num", 0)
  return (
    <div className="test">
      <p>Other - {num}</p>
      <button onClick={() => setNum(Math.random())}>Other Click</button>
    </div>
  );
}

export default Other;