import React, { useState } from 'react';
import './fan.css';
import FanAnimation from '../../../assets/fan.gif';
import FanOff from '../../../assets/fan.jpg';

const Fan = () => {
  const [isActive, setIsActive] = useState(true);

  const toggleFan = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="fan-container">
        <button className="fan-toggle-button" onClick={toggleFan}>
            <div className="fan-image">
                {isActive ? (
                <img src={FanAnimation} width={300} height={300} alt="Fan Animation" />
                ) : (
                <img src={FanOff} width={300} height={300} alt="Fan Off" />
                )}
            </div>
        </button>
    </div>
  );
};

export default Fan;
