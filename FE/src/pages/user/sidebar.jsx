import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './sidebar.css';

import IconDashBoard from '../../assets/IconDashboard.png';
import IconLogs from '../../assets/IconLogs.png';
import IconGarden from '../../assets/iconGarden.png';
import IconDevices from '../../assets/IconDevice.png';
import IconUser from '../../assets/iconUser.png';
import IconLogout from '../../assets/IconLogout.png';
import IconNotification from '../../assets/iconNotification.png';

function Sidebar({ isOpen, closeSidebar }) {
  const navigate = useNavigate();

  const user = {
    name: "Nguyễn Khánh Lộc",
    role: "Quản lý",
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase();
  };

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    navigate('/login');
  };

  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const distance = touchStartX.current - touchEndX.current;
      if (distance > 50) {
        closeSidebar();
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div
      className={`sidebar-container ${isOpen ? 'open' : ''}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="sidebar-header">
        <h3>Smart Garden</h3>
      </div>
      <ul className="sidebar-menu">
        <li>
          <NavLink to="/user/dashboard" end className={({ isActive }) => (isActive ? 'active-link' : '')}>
            <img src={IconDashBoard} alt="Dashboard" />
            <div>Dashboard</div>
          </NavLink>
        </li>

        <li>
          <NavLink to="/user/logs" className={({ isActive }) => (isActive ? 'active-link' : '')}>
            <img src={IconLogs} alt="Logs" />
            <div>Lịch sử</div>
          </NavLink>
        </li>

        <li>
          <NavLink to="/user/garden" className={({ isActive }) => (isActive ? 'active-link' : '')}>
            <img src={IconGarden} alt="Logs" />
            <div>Khu vườn</div>
          </NavLink>
        </li>

        <li>
          <NavLink to="/user/devices" className={({ isActive }) => (isActive ? 'active-link' : '')}>
            <img src={IconDevices} alt="Devices" />
            <div>Thiết bị</div>
          </NavLink>
        </li>

        <li>
          <NavLink to="/user/setting" className={({ isActive }) => (isActive ? 'active-link' : '')}>
            <img src={IconUser} alt="Settings" />
            <div>Người dùng</div>
          </NavLink>
        </li>
      </ul>

      <div className="sidebar-footer">
        <NavLink to="/user/notifications" className="sidebar-item">
          <img src={IconNotification} alt="Notifications" style={{width:20, height:20}}/>
          <div>Thông báo</div>
        </NavLink>

        <NavLink to="/user/profile" className="sidebar-user">
          <div className="user-avatar">{getInitials(user.name)}</div>
          <div className="user-info">
            <span className="user-name">{user.name}</span>
            <span className="user-role">{user.role}</span>
          </div>
        </NavLink>

        <button onClick={handleLogout} className="sidebar-item logout-button">
          <img src={IconLogout} alt="Logout" style={{width:20, height:20}}/>
          <div>Đăng xuất</div>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;


