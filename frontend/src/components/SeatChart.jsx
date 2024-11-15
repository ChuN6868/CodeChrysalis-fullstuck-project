import React, { useEffect, useState } from "react";
import axios from "axios";
import { ReactSVG } from "react-svg";
import seatChart from "../assets/images/seat.svg";
import "../assets/css/seat.css";
import RegisterForm from "./RegisterForm";

const SeatChart = () => {
  const [seatInfo, setSeatInfo] = useState(null);
  const [clickedNumber, setClickedNumber] = useState(null);

  const handleEllipseClick = (event) => {
    const seatNumber = event.target.dataset.seat;
    console.log(seatNumber + "番の座席がクリックされました");
    setClickedNumber(seatNumber);
  };

  const getSeatInfo = async () => {
    try {
      console.log("before");
      const response = await axios.get("http://localhost:5000/api/seatinfo");
      console.log(response.data);
      setSeatInfo(response.data);
      console.log("set完了");
    } catch (err) {
      console.error("DBから座席情報の取得する際にエラーが発生", err.response);
    }
  };

  const addUserName = (svg) => {
    for (let i = 0; i < seatInfo.length; i++) {
      const seatId = 'text[data-seat-id="seat-' + (i + 1) + '"]';
      const targetText = svg.querySelector(seatId);
      if (targetText) {
        targetText.textContent = seatInfo[i].user_name;
      }
    }
  };

  useEffect(() => {
    getSeatInfo();
  }, []);

  useEffect(() => {
    if (seatInfo) {
      console.log("useEffect");
      console.log(seatInfo);
      console.log(seatInfo[0].user_name);
    }
  }, [seatInfo]);

  return (
    <div>
      <ReactSVG
        src={seatChart}
        beforeInjection={(svg) => {
          // ここでsvgが挿入される前に加工ができるらしい
          svg.querySelectorAll("ellipse").forEach((ellipseElement) => {
            ellipseElement.addEventListener("click", handleEllipseClick);
            ellipseElement.classList.add("seat-button");
          });

          // ここでDBから取得したユーザー名を座席に表示させる
          addUserName(svg);
        }}
      />
      {clickedNumber ? (
        <>
          <p>{clickedNumber}番の座席が選択されています</p>
          <RegisterForm clickedNumber={clickedNumber} getSeatInfo={getSeatInfo} />
        </>
      ) : (
        <p>座席を選択してください</p>
      )}
      {/* <p>{seatInfo}</p> */}
    </div>
  );
};

export default SeatChart;
