import React, { useState, useEffect } from "react";
import styles from "./logs.module.css";

// Thông tin Adafruit IO
const ADAFRUIT_USERNAME = "nhatnam1308";
const ADAFRUIT_API_KEY = "aio_LBCe46cnlptFD9s0bKbxdQFM1DwX";

// Các feed keys
const FEED_TEMP = "bbc-temp";
const FEED_HUMID_AIR = "bbc-humid-air";
const FEED_HUMID_SOIL = "bbc-humid-soil";
const FEED_LIGHT = "light";
const FEED_PUMP = "bbc-pump1";
const FEED_LED = "bbc-led";

// Số bản ghi hiển thị trên 1 trang
const ITEMS_PER_PAGE = 20;

// Danh sách nhà kính (JSON)
const greenhouseList = [
  { id: "greenhouse1", name: "Nhà kính 1" },
  { id: "greenhouse2", name: "Nhà kính 2" },
  { id: "greenhouse3", name: "Nhà kính 3" }
];

function Logs() {
  const [selectedGreenhouse, setSelectedGreenhouse] = useState(null);
  const [selectedFeed, setSelectedFeed] = useState(FEED_TEMP);
  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    if (selectedGreenhouse) {
      fetchData(selectedFeed);
      setCurrentPage(0);
    }
  }, [selectedFeed, selectedGreenhouse]);

  const fetchData = async (feedKey) => {
    setLoading(true);
    setError(null);
    try {
      const url = `https://io.adafruit.com/api/v2/${ADAFRUIT_USERNAME}/feeds/${feedKey}/data?limit=50`;
      const response = await fetch(url, {
        headers: { "X-AIO-Key": ADAFRUIT_API_KEY }
      });
      if (!response.ok) throw new Error("Failed to fetch data");
      const jsonData = await response.json();
      setDataList(jsonData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getFilteredData = () => {
    if (!fromDate && !toDate) return dataList;
    const from = fromDate ? new Date(fromDate) : null;
    const to = toDate ? new Date(toDate) : null;

    return dataList.filter((item) => {
      const itemDate = new Date(item.created_at);
      if (from && itemDate < from) return false;
      if (to && itemDate > to) return false;
      return true;
    });
  };

  const filteredData = getFilteredData();
  const startIndex = currentPage * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const displayedItems = filteredData.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  const handlePrevPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };
  const handleNextPage = () => {
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
  };

  const handleSelectFeed = (feedKey) => setSelectedFeed(feedKey);
  const handleSearch = () => setCurrentPage(0);

  // Component chọn nhà kính
  const GreenhouseSelection = () => (
    <div className={styles.greenhouseSelection}>
      <h2>Chọn Nhà Kính</h2>
      {greenhouseList.map((greenhouse) => (
        <button 
          key={greenhouse.id}
          onClick={() => setSelectedGreenhouse(greenhouse.id)}
          className={styles.greenhouseButton}
        >
          {greenhouse.name}
        </button>
      ))}
    </div>
  );

  // Nếu chưa chọn nhà kính, hiển thị giao diện chọn
  if (!selectedGreenhouse) {
    return <GreenhouseSelection />;
  }

  return (
    <div className={styles.logsContainer}>
      {/* Sidebar chọn loại dữ liệu */}
      <div className={styles.sidebar}>
        <button className={selectedFeed === FEED_TEMP ? styles.activeButton : styles.btn} onClick={() => handleSelectFeed(FEED_TEMP)}>Nhiệt độ</button>
        <button className={selectedFeed === FEED_HUMID_AIR ? styles.activeButton : styles.btn} onClick={() => handleSelectFeed(FEED_HUMID_AIR)}>Độ ẩm không khí</button>
        <button className={selectedFeed === FEED_HUMID_SOIL ? styles.activeButton : styles.btn} onClick={() => handleSelectFeed(FEED_HUMID_SOIL)}>Độ ẩm đất</button>
        <button className={selectedFeed === FEED_LIGHT ? styles.activeButton : styles.btn} onClick={() => handleSelectFeed(FEED_LIGHT)}>Cường độ ánh sáng</button>
        <button className={selectedFeed === FEED_PUMP ? styles.activeButton : styles.btn} onClick={() => handleSelectFeed(FEED_PUMP)}>Máy bơm</button>
        <button className={selectedFeed === FEED_LED ? styles.activeButton : styles.btn} onClick={() => handleSelectFeed(FEED_LED)}>Đèn chiếu sáng</button>
      </div>

      {/* Nội dung chính */}
      <div className={styles.content}>
        <h2 className={styles.title}>Lịch sử dữ liệu - {selectedGreenhouse}</h2>
        <div className={styles.filterRow}>
          <label>Từ ngày: </label>
          <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
          <label>Đến ngày: </label>
          <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
          <button onClick={handleSearch}>Tìm kiếm</button>
        </div>

        {loading && <div>Đang tải dữ liệu...</div>}
        {error && <div className={styles.error}>Lỗi: {error}</div>}

        {!loading && !error && (
          <>
            <table className={styles.dataTable}>
              <thead>
                <tr>
                  <th>Tên thiết bị</th>
                  <th>Mã thiết bị</th>
                  <th>Thời gian đo</th>
                  <th>Giá trị</th>
                </tr>
              </thead>
              <tbody>
                {displayedItems.map((item) => {
                  let displayValue = item.value;
                  if ([FEED_PUMP, FEED_LED].includes(selectedFeed)) {
                    displayValue = item.value === "1" ? "Bật" : item.value === "0" ? "Tắt" : item.value;
                  }

                  return (
                    <tr key={item.id}>
                      <td>Cảm biến {selectedFeed}</td>
                      <td>DHT20</td>
                      <td>{new Date(item.created_at).toLocaleString()}</td>
                      <td>{displayValue}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className={styles.pagination}>
              <button onClick={handlePrevPage} disabled={currentPage === 0}>Trang trước</button>
              <span>Trang {currentPage + 1} / {totalPages || 1}</span>
              <button onClick={handleNextPage} disabled={currentPage >= totalPages - 1}>Trang sau</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Logs;
