// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

import React, { useEffect, useState } from "react";
import axios from "axios";
import SeatChart from "./components/SeatChart";

function App() {
  const [hello, setHello] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Hello WorldのバックエンドAPIを呼び出す
    axios.get('http://localhost:5000/api/hello')
      .then(response => setHello(response.data.message))
      .catch(error => console.error('Error fetching data:', error));

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
      <h1>{hello}</h1>
      <SeatChart />
      <h1>{message}</h1>
      <p className="db-test">DBテスト</p>
    </div>
  );
}

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

export default App
