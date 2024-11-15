import React, { useState } from "react"
import axios from "axios"

const RegisterForm = () => {
  const [seatNumber, setSeatNumber] = useState('');
  const [userName, setUserName] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault()

    const data = {
        seatNumber: seatNumber,
        userName: userName
    }

    try {
        const getRes = await axios.get('http://localhost:5000/api/hello');
        console.log(getRes)
        console.log(data)
        const response = await axios.post('http://localhost:5000/api/register', data);
        console.log(response.data);
    } catch (error) {
        console.error("座席情報の登録でエラーが発生", error.response);
    }

  }

  return (
    <form onSubmit={handleSubmit}>
        <input
            type="text"
            placeholder="Seat Number"
            value={seatNumber}
            onChange={(e) => setSeatNumber(e.target.value)}
        />
        <input 
            type="text"
            placeholder="User Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
        />
        <button type="submit">座席情報の登録</button>
    </form>
  );
};

export default RegisterForm;
