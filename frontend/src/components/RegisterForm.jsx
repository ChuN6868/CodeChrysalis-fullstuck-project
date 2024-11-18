import React, { useState } from "react"
import axios from "axios"

const RegisterForm = ({clickedNumber, getSeatInfo}) => {
  // const [seatNumber, setSeatNumber] = useState('');
  const [userName, setUserName] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault()

    const data = {
        seatNumber: clickedNumber,
        userName: userName
    }

    try {
        const registRes = await axios.post('http://localhost:5000/api/register', data);
        console.log(registRes);
        getSeatInfo();

        console.log("全APIの完了")
    } catch (error) {
        console.error("座席情報の登録でエラーが発生", error.response);
    }

  }

  return (
    <form onSubmit={handleSubmit}>
        {/* <input
            type="number"
            min="1"
            max="6"
            placeholder="Seat Number"
            value={seatNumber}
            onChange={(e) => setSeatNumber(e.target.value)}
        /> */}
        <input 
            className="regist-form-input"
            type="text"
            placeholder="User Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
        />
        <button className="regist-form-button" type="submit">座席情報の登録</button>
    </form>
  );
};

export default RegisterForm;
