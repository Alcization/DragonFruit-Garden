import React, { useState } from "react";
import WeatherPage from "./weatherPage.jsx";
import ChartPage from "./chart.jsx";
import PieChartPage from "./piechart.jsx";
import styles from './dashboard.module.css';
import Control from "./control.jsx";

const Dashboard = () => {
  const [selectedGreenhouse, setSelectedGreenhouse] = useState(null);

  // Dữ liệu JSON chứa danh sách các nhà kính
  const greenhouseList = [
    { id: "greenhouse1", name: "Nhà kính 1" },
    { id: "greenhouse2", name: "Nhà kính 2" },
    { id: "greenhouse3", name: "Nhà kính 3" }
  ];

  // Component hiển thị lựa chọn nhà kính bằng các nút bấm
  const GreenhouseSelection = () => (
    <div className={styles.greenhouse_selection}>
      <h2>Chọn Nhà Kính</h2>
      {greenhouseList.map((greenhouse) => (
        <button className={styles.greenhouseButton}
          key={greenhouse.id}
          onClick={() => setSelectedGreenhouse(greenhouse.id)}
        >
          {greenhouse.name}
        </button>
      ))}
    </div>
  );

  // Nếu chưa chọn nhà kính, hiển thị giao diện lựa chọn
  if (!selectedGreenhouse) {
    return <GreenhouseSelection />;
  }

  // Sau khi chọn nhà kính, hiển thị giao diện Dashboard chính
  return (
    <>
      <div className={styles.charts_row}>
        <ChartPage greenhouse={selectedGreenhouse} />
        <PieChartPage greenhouse={selectedGreenhouse} />  
      </div>
      <div className={styles.charts_row}>
        <Control greenhouse={selectedGreenhouse} />
        <WeatherPage greenhouse={selectedGreenhouse} />
      </div> 
    </>
  );
};

export default Dashboard;
