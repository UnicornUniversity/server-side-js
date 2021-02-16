import logo from './logo.svg';
import './App.css';
import {useEffect} from 'react'

function App() {

  useEffect(() => {
    // code to run on component mount
    fetch('/book/get?code=abc')
    .then(response => response.json())
    .then(data => console.log(data))
  }, [])

  return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <p>
            Hello world!
          </p>
        </header>
      </div>
  );
}

export default App;
