import React, { useState } from 'react';
import './header.css';
import iconSetting from '../../assets/iconSetting.png'

function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const userName = "Nguyễn Khánh Lộc";

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const logOut = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  }

  return (
    <div className="header-container">
      <div className="header-right">
        <div className="user-info">
          <span className="user-name">{userName}</span>
          <span className="arrow-icon" onClick={toggleDropdown}><img src={iconSetting} alt="iconSetting" /></span>
        </div>

        {dropdownOpen && (
          <div className="header-dropdown">
            <ul>
              <li>Thông tin cá nhân</li>
              <li onClick={logOut}>Đăng xuất</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
