import './App.css';
import useCopyToClipboard from './hooks/useCopyToClipboard';

const App = () => {
  const { isCopied, copyToClipboard } = useCopyToClipboard()

  return (
    <div className='flex'>
      <button onClick={() => copyToClipboard("techie vishwa")}>{isCopied ? "Copied" : "Copy"}</button>
    </div>
  );
}

export default App;