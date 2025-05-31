import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import './piechart.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const centerTextPlugin = {
  id: 'centerTextPlugin',
  beforeDraw: (chart, args, options) => {
    const { width, height, ctx } = chart;
    const text = options.text || '';
    const fontSize = options.fontSize || 16;
    const fontColor = options.fontColor || '#000';

    ctx.save();
    ctx.font = `${fontSize}px sans-serif`;
    ctx.fillStyle = fontColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Vị trí ở chính giữa chart
    const centerX = width / 2;
    const centerY = height / 2;
    ctx.fillText(text, centerX, centerY);
    ctx.restore();
  }
};

// Đăng ký plugin vào Chart.js
ChartJS.register(centerTextPlugin);

const ADAFRUIT_USERNAME = "nhatnam1308";
const ADAFRUIT_API_KEY = "aio_LBCe46cnlptFD9s0bKbxdQFM1DwX";

// Các FEED_KEY
const FEED_TEMP       = "bbc-temp";  
const FEED_HUMID_AIR  = "bbc-humid-air"; 
const FEED_HUMID_SOIL = "bbc-humid-soil"; 
const FEED_LIGHT      = "light";

function PieChartPage() {
  // Lưu 4 giá trị mới nhất của mỗi feed
  const [tempValue, setTempValue] = useState(0);
  const [humidAirValue, setHumidAirValue] = useState(0);
  const [humidSoilValue, setHumidSoilValue] = useState(0);
  const [lightValue, setLightValue] = useState(0);
  const [loading, setLoading] = useState(true);

  // Hàm fetch giá trị mới nhất (1 bản ghi) từ feed Adafruit IO
  const fetchLatestValue = async (feedKey, setter) => {
    try {
      const url = `https://io.adafruit.com/api/v2/${ADAFRUIT_USERNAME}/feeds/${feedKey}/data?limit=1`;
      const response = await fetch(url, {
        headers: {
          'X-AIO-Key': ADAFRUIT_API_KEY,
        },
      });
      const data = await response.json();
      if (data && data.length > 0) {
        const latest = parseFloat(data[0].value);
        setter(isNaN(latest) ? 0 : latest);
      } else {
        setter(0);
      }
    } catch (error) {
      console.error(`Lỗi khi fetch feed ${feedKey}:`, error);
      setter(0);
    }
  };

  // useEffect fetch cả 4 giá trị khi component mount
  useEffect(() => {
    async function fetchAll() {
      await Promise.all([
        fetchLatestValue(FEED_TEMP, setTempValue),
        fetchLatestValue(FEED_HUMID_AIR, setHumidAirValue),
        fetchLatestValue(FEED_HUMID_SOIL, setHumidSoilValue),
        fetchLatestValue(FEED_LIGHT, setLightValue),
      ]);
      setLoading(false);
    }
    fetchAll();
    const interval = setInterval(fetchAll, 5000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <div className="donut-page-container">Đang tải dữ liệu...</div>;
  }
  
  const chartDataTemp = {
    labels: ['Giá trị', 'Còn lại'],
    datasets: [
      {
        data: [tempValue, 100 - tempValue],
        backgroundColor: ['red', '#FFFFFF'],
        borderWidth: 0
      }
    ]
  };
  const optionsTemp = {
    cutout: '70%', // độ dày vòng tròn
    plugins: {
      legend: { display: false },
      centerTextPlugin: {
        text: `${tempValue} °C`, 
        fontSize: 18, 
        fontColor: '#000'
      }
    }
  };

  const chartDataHumidAir = {
    labels: ['Giá trị', 'Còn lại'],
    datasets: [
      {
        data: [humidAirValue, 100 - humidAirValue],
        backgroundColor: ['green', '#FFFFFF'],
        borderWidth: 0
      }
    ]
  };
  const optionsHumidAir = {
    cutout: '70%',
    plugins: {
      legend: { display: false },
      centerTextPlugin: {
        text: `${humidAirValue} %`,
        fontSize: 18,
        fontColor: '#000'
      }
    }
  };

  const chartDataHumidSoil = {
    labels: ['Giá trị', 'Còn lại'],
    datasets: [
      {
        data: [humidSoilValue, 100 - humidSoilValue],
        backgroundColor: ['blue', '#FFFFFF'],
        borderWidth: 0
      }
    ]
  };
  const optionsHumidSoil = {
    cutout: '70%',
    plugins: {
      legend: { display: false },
      centerTextPlugin: {
        text: `${humidSoilValue} %`,
        fontSize: 18,
        fontColor: '#000'
      }
    }
  };

  const chartDataLight = {
    labels: ['Giá trị', 'Còn lại'],
    datasets: [
      {
        data: [lightValue, 100 - lightValue],
        backgroundColor: ['yellow', '#FFFFFF'],
        borderWidth: 0
      }
    ]
  };
  const optionsLight = {
    cutout: '70%',
    plugins: {
      legend: { display: false },
      centerTextPlugin: {
        text: `${lightValue} kLux`,
        fontSize: 18,
        fontColor: '#000'
      }
    }
  };

  return (
    <div className="donut-page-container">
      <h2>Biểu đồ hình quạt - giá trị mới nhất</h2>
      <div className="donut-charts-grid">
        <div className="donut-item">
          <Doughnut data={chartDataTemp} options={optionsTemp} />
        </div>
        <div className="donut-item">
          <Doughnut data={chartDataHumidAir} options={optionsHumidAir} />
        </div>
        <div className="donut-item">
          <Doughnut data={chartDataHumidSoil} options={optionsHumidSoil} />
        </div>
        <div className="donut-item">
          <Doughnut data={chartDataLight} options={optionsLight} />
        </div>
      </div>
    </div>
  );
}

export default PieChartPage;
