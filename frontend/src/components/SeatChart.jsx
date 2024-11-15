import React, { useState } from "react"
import { ReactSVG } from "react-svg"
import seatChart from '../assets/images/seat.svg'
import "../assets/css/seat.css"

const SeatChart = () => {
  const [clickedNumber, setClickedNumber] = useState(null);

  const handleEllipseClick = (event) => {
    const seatNumber = event.target.dataset.seat;
    console.log(seatNumber + '番の円がクリックされました')
    setClickedNumber(seatNumber)
  }

  return (
    <div>
        <ReactSVG
          src={seatChart}
          beforeInjection={(svg) => {
            // ここでsvgが挿入される前に加工ができるらしい
            svg.querySelectorAll('ellipse').forEach((ellipseElement) => {
              ellipseElement.addEventListener('click', handleEllipseClick);
              ellipseElement.classList.add('seat-button');
            });
          }}
        />
        <p>{clickedNumber}</p>
    </div>
  );
};

export default SeatChart;
