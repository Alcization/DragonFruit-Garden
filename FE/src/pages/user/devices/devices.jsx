// import React, { useState, useEffect } from 'react';
// import styles from './devices.module.css';

// const initialDevices = [
//   { id: 1, name: 'Sensor nhiệt độ', type: 'Thiết bị đầu vào', code: 'DHT20', greenhouse: 'Nhà kính 1', status: 'on' },
//   { id: 2, name: 'Sensor độ ẩm không khí', type: 'Thiết bị đầu vào', code: 'DHT20', greenhouse: 'Nhà kính 2', status: 'off' },
//   { id: 3, name: 'Sensor độ ẩm đất', type: 'Thiết bị đầu vào', code: 'DHT20', greenhouse: '', status: 'on' },
//   { id: 4, name: 'Sensor ánh sáng', type: 'Thiết bị đầu vào', code: 'DHT20', greenhouse: '', status: 'on' },
//   { id: 5, name: 'Máy bơm', type: 'Thiết bị đầu ra', code: 'DHT20', greenhouse: 'Nhà kính 2', status: 'off' },
//   { id: 6, name: 'Đèn', type: 'Thiết bị đầu ra', code: 'DHT20', greenhouse: '', status: 'on' },
//   { id: 7, name: 'Màn hình', type: 'Thiết bị đầu ra', code: 'DHT20', greenhouse: '', status: 'off' }
// ];

// function Devices() {
//   const [devices, setDevices] = useState(initialDevices);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [addingNew, setAddingNew] = useState(false);
//   const [deletingDevice, setDeletingDevice] = useState(null);
//   const [newDeviceData, setNewDeviceData] = useState({
//     name: '',
//     type: 'Thiết bị đầu vào',
//     code: 'DHT20',
//     greenhouse: '',
//     status: 'on'
//   });
  
//   useEffect(() => {
//     const fetchSensors = async () => {
//       try {
//         const response = await fetch('/api/sensors');
//         const result = await response.json();
//         console.log('Dữ liệu cảm biến từ API:', result.data);
//       } catch (error) {
//         console.error('Lỗi khi gọi API sensors:', error);
//       }
//     };

//     fetchSensors();
//   }, []);

//   // Toggle trạng thái thiết bị
//   const handleToggleStatus = (id) => {
//     setDevices((prev) =>
//       prev.map((device) =>
//         device.id === id ? { ...device, status: device.status === 'on' ? 'off' : 'on' } : device
//       )
//     );
//   };

//   // Xử lý thay đổi input trong modal thêm thiết bị mới
//   const handleNewDeviceChange = (e) => {
//     const { name, value } = e.target;
//     setNewDeviceData((prev) => ({ ...prev, [name]: value }));
//   };

//   // Lưu thiết bị mới vào danh sách
//   const handleSaveNewDevice = () => {
//     const newDevice = {
//       ...newDeviceData,
//       id: Date.now()
//     };
//     setDevices((prev) => [...prev, newDevice]);
//     setNewDeviceData({
//       name: '',
//       type: 'Thiết bị đầu vào',
//       code: 'DHT20',
//       greenhouse: 'Không có',
//       status: 'on'
//     });
//     setAddingNew(false);
//   };

//   // Xử lý mở hộp thoại xóa thiết bị
//   const handleDeleteClick = (device) => {
//     if (device.greenhouse) {
//       alert('Không thể xóa thiết bị đang nằm trong một nhà kính!');
//       return;
//     }
//     setDeletingDevice(device);
//   };

//   // Xử lý xác nhận xóa thiết bị
//   const handleConfirmDelete = () => {
//     setDevices((prev) => prev.filter((device) => device.id !== deletingDevice.id));
//     setDeletingDevice(null);
//   };

//   // Lọc danh sách thiết bị theo tên
//   const filteredDevices = devices.filter((device) =>
//     device.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className={styles.container}>
//       <h1>Quản Lý Thiết Bị</h1>
//       <div className={styles.controls}>
//         <input
//           type="text"
//           placeholder="Tìm kiếm theo tên thiết bị"
//           className={styles.searchInput}
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//         />
//         <button className={styles.addButton} onClick={() => setAddingNew(true)}>
//           Thêm Thiết Bị Mới
//         </button>
//       </div>


//       <table className={styles.deviceTable}>
//         <thead>
//           <tr>
//             <th>Tên thiết bị</th>
//             <th>Loại thiết bị</th>
//             <th>Mã thiết bị</th>
//             <th>Nhà kính</th>
//             <th>Trạng thái</th>
//             <th>Hành động</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredDevices.map((device) => (
//             <tr key={device.id}>
//               <td data-label="Tên thiết bị">{device.name}</td>
//               <td data-label="Loại thiết bị">{device.type}</td>
//               <td data-label="Mã thiết bị">{device.code}</td>
//               <td data-label="Nhà kính">{device.greenhouse || 'Không có'}</td>
//               <td data-label="Trạng thái" className={device.status === 'on' ? styles.statusOn : styles.statusOff}>
//                 {device.status === 'on' ? 'Bật' : 'Tắt'}
//               </td>
//               <td data-label="Hành động">
//                 <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
//                   <button className={styles.toggleButton} onClick={() => handleToggleStatus(device.id)}>
//                     {device.status === 'on' ? 'Tắt' : 'Bật'}
//                   </button>
//                   <button className={styles.deleteButton} onClick={() => handleDeleteClick(device)}>
//                     Xóa
//                   </button>
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Modal Xác nhận xóa thiết bị */}
//       {deletingDevice && (
//         <div className={styles.modal}>
//           <div className={styles.modalContent}>
//             <h2>Xác nhận xóa thiết bị</h2>
//             <p>Bạn có chắc chắn muốn xóa thiết bị "{deletingDevice.name}" không?</p>
//             <div className={styles.modalActions}>
//               <button className={styles.deleteButton} onClick={handleConfirmDelete}>
//                 Xóa
//               </button>
//               <button className={styles.cancelButton} onClick={() => setDeletingDevice(null)}>
//                 Hủy
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//       {/* Modal Thêm thiết bị mới */}
//       {addingNew && (
//         <div className={styles.modal}>
//           <div className={styles.modalContent}>
//             <h2>Thêm Thiết Bị Mới</h2>
//             <input
//               className={styles.modalInput}
//               type="text"
//               name="name"
//               placeholder="Tên thiết bị"
//               value={newDeviceData.name}
//               onChange={handleNewDeviceChange}
//             />
//             <select
//               className={styles.modalInput}
//               name="type"
//               value={newDeviceData.type}
//               onChange={handleNewDeviceChange}
//             >
//               <option value="Thiết bị đầu vào">Thiết bị đầu vào</option>
//               <option value="Thiết bị đầu ra">Thiết bị đầu ra</option>
//             </select>
//             <input
//               className={styles.modalInput}
//               type="text"
//               name="code"
//               placeholder="Mã thiết bị"
//               value={newDeviceData.code}
//               onChange={handleNewDeviceChange}
//             />
//             <select
//               className={styles.modalInput}
//               name="greenhouse"
//               value={newDeviceData.greenhouse}
//               onChange={handleNewDeviceChange}
//             >
//               <option value="Nhà kính 1">Nhà kính 1</option>
//               <option value="Nhà kính 2">Nhà kính 2</option>
//               <option value="Không có">Không có</option>
//             </select>
//             <div className={styles.modalActions}>
//               <button className={styles.addButton} onClick={handleSaveNewDevice}>
//                 Lưu
//               </button>
//               <button className={styles.deleteButton} onClick={() => setAddingNew(false)}>
//                 Hủy
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Devices;


import React, { useEffect, useState } from 'react';
import styles from './devices.module.css';

export default function DevicesPage() {
  const [sensors, setSensors] = useState([]);
  const [searchId, setSearchId] = useState('');
  const [newSensor, setNewSensor] = useState({ sensorType: '', location: '', status: 'active' });
  const [addingSensor, setAddingSensor] = useState(false);
  const [editingSensor, setEditingSensor] = useState(null);

  useEffect(() => {
    fetch('/api/sensors')
      .then((res) => res.json())
      .then((data) => setSensors(data.data))
      .catch((err) => console.error('Error fetching sensors:', err));
  }, []);

  const handleSearchById = () => {
    if (!searchId.trim()) return;
    fetch(`/api/sensors/${searchId}`)
      .then((res) => {
        if (!res.ok) throw new Error('Sensor not found');
        return res.json();
      })
      .then((data) => setSensors([data.data]))
      .catch(() => alert('Không tìm thấy cảm biến với ID này.'));
  };

  const handleAddSensor = () => {
    fetch('/api/sensors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newSensor),
    })
      .then((res) => res.json())
      .then((data) => {
        setSensors((prev) => [...prev, data.data]);
        setNewSensor({ sensorType: '', location: '', status: 'active' });
        setAddingSensor(false);
      })
      .catch(() => alert('Lỗi khi thêm cảm biến.'));
  };

  const handleDeleteSensor = (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa cảm biến này?')) return;
    fetch(`/api/sensors/${id}`, { method: 'DELETE' })
      .then((res) => res.json())
      .then(() => setSensors((prev) => prev.filter((sensor) => sensor._id !== id)))
      .catch(() => alert('Lỗi khi xóa cảm biến.'));
  };

  const handleUpdateSensor = () => {
    fetch(`/api/sensors/${editingSensor._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editingSensor),
    })
      .then((res) => res.json())
      .then((data) => {
        setSensors((prev) =>
          prev.map((sensor) => (sensor._id === data.data._id ? data.data : sensor))
        );
        setEditingSensor(null);
      })
      .catch(() => alert('Lỗi khi cập nhật cảm biến.'));
  };

  return (
    <div className={styles.container}>
      <h1>Quản Lý Cảm Biến</h1>

      {/* Tìm kiếm theo ID */}
      <div className={styles.controls}>
        <input
          type="text"
          placeholder="Nhập ID cảm biến"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          className={styles.searchInput}
        />
        <button onClick={handleSearchById} className={styles.addButton}>Tìm kiếm</button>
        <button onClick={() => setAddingSensor(true)} className={styles.addButton}>Thêm Cảm Biến</button>
      </div>

      {/* Danh sách cảm biến */}
      <h2>Danh Sách Cảm Biến</h2>
      <table className={styles.deviceTable}>
        <thead>
          <tr>
            <th>Loại</th>
            <th>Vị trí</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {sensors.map((sensor) => (
            <tr key={sensor._id}>
              <td data-label="Loại cảm biến">{sensor.sensorType}</td>
              <td data-label="Vị trí">{sensor.location}</td>
              <td
                data-label="Trạng thái"
                className={
                  sensor.status.toLowerCase() === 'active'
                    ? styles.statusOn
                    : styles.statusOff
                }
              >
                {sensor.status}
              </td>
              <td data-label="Hành động">
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  <button onClick={() => setEditingSensor(sensor)} className={styles.toggleButton}>Sửa</button>
                  <button onClick={() => handleDeleteSensor(sensor._id)} className={styles.deleteButton}>Xóa</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal Thêm cảm biến */}
      {addingSensor && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Thêm Cảm Biến</h2>
            <input
              type="text"
              placeholder="Loại cảm biến"
              value={newSensor.sensorType}
              onChange={(e) => setNewSensor({ ...newSensor, sensorType: e.target.value })}
              className={styles.modalInput}
            />
            <input
              type="text"
              placeholder="Vị trí"
              value={newSensor.location}
              onChange={(e) => setNewSensor({ ...newSensor, location: e.target.value })}
              className={styles.modalInput}
            />
            <select
              value={newSensor.status}
              onChange={(e) => setNewSensor({ ...newSensor, status: e.target.value })}
              className={styles.modalInput}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="offline">Offline</option>
              <option value="needs calibration">Needs Calibration</option>
              <option value="error">Error</option>
            </select>
            <div className={styles.modalActions}>
              <button onClick={handleAddSensor} className={styles.addButton}>Lưu</button>
              <button onClick={() => setAddingSensor(false)} className={styles.cancelButton}>Hủy</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Chỉnh sửa cảm biến */}
      {editingSensor && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Chỉnh Sửa Cảm Biến</h2>
            <input
              type="text"
              value={editingSensor.sensorType}
              onChange={(e) =>
                setEditingSensor({ ...editingSensor, sensorType: e.target.value })
              }
              className={styles.modalInput}
            />
            <input
              type="text"
              value={editingSensor.location}
              onChange={(e) =>
                setEditingSensor({ ...editingSensor, location: e.target.value })
              }
              className={styles.modalInput}
            />
            <select
              value={editingSensor.status}
              onChange={(e) =>
                setEditingSensor({ ...editingSensor, status: e.target.value })
              }
              className={styles.modalInput}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="offline">Offline</option>
              <option value="needs calibration">Needs Calibration</option>
              <option value="error">Error</option>
            </select>
            <div className={styles.modalActions}>
              <button onClick={handleUpdateSensor} className={styles.addButton}>Cập nhật</button>
              <button onClick={() => setEditingSensor(null)} className={styles.cancelButton}>Hủy</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
