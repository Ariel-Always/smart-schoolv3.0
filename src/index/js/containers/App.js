import React from 'react';
import logo from '../../images/logo.svg';
import '../../css/App.css';

function App() {
  const a = ()=>{
    console.log(123);
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <h4> this is desktop click  <a href="/html/login">this</a> to login page</h4>
      </header>
    </div>
  );
}

export default App;
