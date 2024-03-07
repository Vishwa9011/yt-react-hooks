import './App.css';
import Other from './Other';
import Test from './Test';
import useCopyToClipboard from './hooks/useCopyToClipboard';

const App = () => {
  const { isCopied, copyToClipboard } = useCopyToClipboard()

  return (
    <div className='flex'>
      {/* App
      <Test />
      <Other /> */}
      <button onClick={() => copyToClipboard("techie vishwa 1")}>{isCopied ? "Copied" : "Copy"}</button>
    </div>
  );
}

export default App;