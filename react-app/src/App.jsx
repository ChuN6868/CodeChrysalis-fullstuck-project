// import logo from './logo.svg';
// import './App.css';

import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Hello WorldのバックエンドAPIを呼び出す
    // axios.get('http://localhost:5000/api/hello')
    //   .then(response => setMessage(response.data.message))
    //   .catch(error => console.error('Error fetching data:', error));

    // DBからmessageを取得するAPI
    // fetch('http://localhost:5000/api/message')
    axios.get("http://localhost:5000/api/message")
      .then((response) => {
        console.log("-------------------------")
        console.log(response.data[0].content)
        console.log("-------------------------")

        setMessage(response.data[0].content)
      })
      .catch(error => console.error("DBからのデータ取得でエラー発生", error))
  }, []);

  return (
    <div>
      <h1>{message}</h1>
      <p>DBテスト</p>
    </div>
  );

  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.js</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );
}

export default App;
