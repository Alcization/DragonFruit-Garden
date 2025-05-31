import React, { useState } from 'react';
import styles from './garden.module.css';

const initialGreenhouses = [
  {
    id: 1,
    name: 'Nhà kính A',
    cropType: 'Cà chua',
    plantingDate: '2023-05-01',
    harvestDate: '2023-08-01',
    status: 'đang phát triển',
    sensors: ['Cảm biến 1', 'Cảm biến 2']
  },
  {
    id: 2,
    name: 'Nhà kính B',
    cropType: 'Xà lách',
    plantingDate: '2023-06-01',
    harvestDate: '2023-09-01',
    status: 'chưa gieo trồng',
    sensors: ['Cảm biến 3']
  },
  {
    id: 3,
    name: 'Nhà kính C',
    cropType: 'Dâu tây',
    plantingDate: '2025-06-01',
    harvestDate: '2025-09-01',
    status: 'chưa gieo trồng',
    sensors: ['Cảm biến 4']
  },
  {
    id: 4,
    name: 'Nhà kính D',
    cropType: 'Bí đao',
    plantingDate: '2025-06-01',
    harvestDate: '2025-09-01',
    status: 'chưa gieo trồng',
    sensors: ['Cảm biến 5']
  }
];

function Garden() {
  const [greenhouses, setGreenhouses] = useState(initialGreenhouses);
  const [editingGreenhouseId, setEditingGreenhouseId] = useState(null);
  const [editingData, setEditingData] = useState(null);
  const [addingNew, setAddingNew] = useState(false);
  const [newGreenhouseData, setNewGreenhouseData] = useState({
    name: '',
    cropType: '',
    plantingDate: '',
    harvestDate: '',
    status: 'chưa gieo trồng',
    sensors: []
  });
  const [newSensor, setNewSensor] = useState('');

  // Xử lý chỉnh sửa nhà kính
  const handleEditClick = (gh) => {
    setEditingGreenhouseId(gh.id);
    setEditingData({ ...gh });
    setNewSensor('');
  };

  const handleCancelEdit = () => {
    setEditingGreenhouseId(null);
    setEditingData(null);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSensorDelete = (sensorIndex) => {
    setEditingData((prev) => ({
      ...prev,
      sensors: prev.sensors.filter((_, idx) => idx !== sensorIndex)
    }));
  };

  const handleAddSensorEdit = () => {
    if (newSensor.trim() !== '') {
      setEditingData((prev) => ({
        ...prev,
        sensors: [...prev.sensors, newSensor.trim()]
      }));
      setNewSensor('');
    }
  };

  const handleSaveEdit = () => {
    setGreenhouses((prev) =>
      prev.map((gh) => (gh.id === editingGreenhouseId ? editingData : gh))
    );
    setEditingGreenhouseId(null);
    setEditingData(null);
  };

  // Xử lý thêm nhà kính mới
  const handleNewGreenhouseChange = (e) => {
    const { name, value } = e.target;
    setNewGreenhouseData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSensorNew = () => {
    if (newSensor.trim() !== '') {
      setNewGreenhouseData((prev) => ({
        ...prev,
        sensors: [...prev.sensors, newSensor.trim()]
      }));
      setNewSensor('');
    }
  };

  const handleSaveNewGreenhouse = () => {
    const newGreenhouse = { ...newGreenhouseData, id: Date.now() };
    setGreenhouses((prev) => [...prev, newGreenhouse]);
    setNewGreenhouseData({
      name: '',
      cropType: '',
      plantingDate: '',
      harvestDate: '',
      status: 'chưa gieo trồng',
      sensors: []
    });
    setAddingNew(false);
    setNewSensor('');
  };

  const handleDeleteGreenhouse = (id) => {
    setGreenhouses((prev) => prev.filter((gh) => gh.id !== id));
  };

  return (
    <div className={styles.container}>
      <h1>Quản Lý Khu Vườn</h1>
      <button className={styles.greenhouseButtonAdd} onClick={() => setAddingNew(true)}>Thêm Nhà Kính Mới</button>

      <div className={styles.greenhouseList}>
        {greenhouses.map((gh) => (
          <div key={gh.id} className={styles.greenhouseCard}>
            <h2>{gh.name}</h2>
            <p>Loại Cây Trồng: {gh.cropType}</p>
            <p>Ngày Gieo Trồng: {gh.plantingDate}</p>
            <p>Ngày Thu Hoạch: {gh.harvestDate}</p>
            <p>Tình Trạng: {gh.status}</p>
            <div className={styles.sensorContainer}>
              <p>Cảm Biến:</p>
              {gh.sensors.map((sensor, index) => (
                <span key={index} className={styles.sensorItem}>
                  {sensor}
                </span>
              ))}
            </div>
            <button className={styles.greenhouseButton} onClick={() => handleEditClick(gh)}>Chỉnh Sửa</button>
            <button className={styles.greenhouseButtonDelete} onClick={() => handleDeleteGreenhouse(gh.id)}>Xóa Nhà Kính</button>
          </div>
        ))}
      </div>

      {/* Modal Thêm Nhà Kính */}
      {addingNew && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Thêm Nhà Kính</h2>
            <input className={styles.modalInput}
              type="text"
              name="name"
              placeholder="Tên Nhà Kính"
              value={newGreenhouseData.name}
              onChange={handleNewGreenhouseChange}
            />
            <input className={styles.modalInput}
              type="text"
              name="cropType"
              placeholder="Loại Cây Trồng"
              value={newGreenhouseData.cropType}
              onChange={handleNewGreenhouseChange}
            />
            <input className={styles.modalInput}
              type="date"
              name="plantingDate"
              placeholder="Ngày Gieo Trồng"
              value={newGreenhouseData.plantingDate}
              onChange={handleNewGreenhouseChange}
            />
            <input className={styles.modalInput}
              type="date"
              name="harvestDate"
              placeholder="Ngày Thu Hoạch"
              value={newGreenhouseData.harvestDate}
              onChange={handleNewGreenhouseChange}
            />
            <select className={styles.modalInput}
              name="status"
              value={newGreenhouseData.status}
              onChange={handleNewGreenhouseChange}
            >
              <option value="chưa gieo trồng">Chưa Gieo Trồng</option>
              <option value="đang phát triển">Đang Phát Triển</option>
              <option value="đã thu hoạch">Đã Thu Hoạch</option>
            </select>
            <div className={styles.sensorContainer}>
              <h3>Cảm Biến:</h3>
              {newGreenhouseData.sensors.map((sensor, index) => (
                <div key={index} className={styles.sensorItem}>
                  {sensor}
                </div>
              ))}
              <input  className={styles.modalInput}
                type="text"
                placeholder="Thêm cảm biến"
                value={newSensor}
                onChange={(e) => setNewSensor(e.target.value)}
              />
              <button className={styles.greenhouseButtonAdd} onClick={handleAddSensorNew}>Thêm Cảm Biến</button>
            </div>
            <button className={styles.greenhouseButton} onClick={handleSaveNewGreenhouse}>Lưu</button>
            <button className={styles.greenhouseButtonDelete} onClick={() => { setAddingNew(false); setNewSensor(''); }}>Hủy</button>
          </div>
        </div>
      )}

      {/* Modal Chỉnh Sửa Nhà Kính */}
      {editingGreenhouseId !== null && editingData && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Chỉnh Sửa Nhà Kính</h2>
            <input  className={styles.modalInput}
              type="text"
              name="name"
              placeholder="Tên Nhà Kính"
              value={editingData.name}
              onChange={handleEditChange}
            />
            <input className={styles.modalInput}
              type="text"
              name="cropType"
              placeholder="Loại Cây Trồng"
              value={editingData.cropType}
              onChange={handleEditChange}
            />
            <input className={styles.modalInput}
              type="date"
              name="plantingDate"
              placeholder="Ngày Gieo Trồng"
              value={editingData.plantingDate}
              onChange={handleEditChange}
            />
            <input className={styles.modalInput}
              type="date"
              name="harvestDate"
              placeholder="Ngày Thu Hoạch"
              value={editingData.harvestDate}
              onChange={handleEditChange}
            />
            <select className={styles.modalInput}
              name="status"
              value={editingData.status}
              onChange={handleEditChange}
            >
              <option value="chưa gieo trồng">Chưa Gieo Trồng</option>
              <option value="đang phát triển">Đang Phát Triển</option>
              <option value="đã thu hoạch">Đã Thu Hoạch</option>
            </select>
            <div className={styles.sensorContainer}>
              <h3>Cảm Biến:</h3>
              {editingData.sensors.map((sensor, index) => (
                <div key={index} className={styles.sensorItem}>
                  {sensor}
                  <button className={styles.greenhouseButtonDelete} onClick={() => handleSensorDelete(index)}>Xóa</button>
                </div>
              ))}
              <input className={styles.modalInput}
                type="text"
                placeholder="Thêm cảm biến"
                value={newSensor}
                onChange={(e) => setNewSensor(e.target.value)}
              />
              <button className={styles.greenhouseButtonAdd} onClick={handleAddSensorEdit}>Thêm Cảm Biến</button>
            </div>
            <button className={styles.greenhouseButton} onClick={handleSaveEdit}>Lưu</button>
            <button className={styles.greenhouseButtonDelete} onClick={handleCancelEdit}>Hủy</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Garden;
