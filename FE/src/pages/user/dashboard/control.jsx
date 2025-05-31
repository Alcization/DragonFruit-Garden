import { useState, useEffect } from "react";
import FanAnimation from '../../../assets/fan.gif';
import FanOff from '../../../assets/fan.jpg';
import LightOn from '../../../assets/bulbOn.png';
import LightOff from '../../../assets/bulbOff.png';
import styles from "./Control.module.css";

const ADAFRUIT_USERNAME = "nhatnam1308";
const ADAFRUIT_API_KEY = "aio_LBCe46cnlptFD9s0bKbxdQFM1DwX";

// Feed keys và API URL cho máy bơm và đèn LED
const PUMP_FEED_KEY = "bbc-pump1";
const LED_FEED_KEY = "bbc-led";
const PUMP_API_URL = `https://io.adafruit.com/api/v2/${ADAFRUIT_USERNAME}/feeds/${PUMP_FEED_KEY}/data?limit=1`;
const LED_API_URL = `https://io.adafruit.com/api/v2/${ADAFRUIT_USERNAME}/feeds/${LED_FEED_KEY}/data?limit=1`;

const Control = () => {
  const [pumpData, setPumpData] = useState([]);
  const [ledData, setLedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // State chuyển đổi giữa chế độ tự động (false) và thủ công (true)
  const [isManual, setIsManual] = useState(false);

  // Hàm fetch dữ liệu cho máy bơm
  const fetchPumpData = async () => {
    try {
      const response = await fetch(PUMP_API_URL, {
        headers: { "X-AIO-Key": ADAFRUIT_API_KEY },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch pump data");
      }
      const jsonData = await response.json();
      setPumpData(jsonData);
    } catch (err) {
      setError(err.message);
    }
  };

  // Hàm fetch dữ liệu cho LED
  const fetchLedData = async () => {
    try {
      const response = await fetch(LED_API_URL, {
        headers: { "X-AIO-Key": ADAFRUIT_API_KEY },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch LED data");
      }
      const jsonData = await response.json();
      setLedData(jsonData);
    } catch (err) {
      setError(err.message);
    }
  };

  // Hàm fetch dữ liệu cho cả 2 thiết bị
  const fetchAllData = async () => {
    await Promise.all([fetchPumpData(), fetchLedData()]);
    setLoading(false);
  };

  useEffect(() => {
    fetchAllData();
    const interval = setInterval(fetchAllData, 5000);
    return () => clearInterval(interval);
  }, []);

  // Lấy trạng thái hiện tại từ API (mặc định là "0")
  const pumpState = pumpData.length > 0 ? pumpData[0].value : "0";
  const ledState = ledData.length > 0 ? ledData[0].value : "0";

  // Hàm gửi lệnh thay đổi trạng thái máy bơm (chỉ khi chế độ thủ công)
  const togglePump = async () => {
    if (!isManual) return;
    const newState = pumpState === "1" ? "0" : "1";
    try {
      const response = await fetch(
        `https://io.adafruit.com/api/v2/${ADAFRUIT_USERNAME}/feeds/${PUMP_FEED_KEY}/data`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-AIO-Key": ADAFRUIT_API_KEY,
          },
          body: JSON.stringify({ value: newState }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update pump state");
      }
      fetchAllData();
    } catch (err) {
      console.error("Error toggling pump:", err.message);
    }
  };

  // Hàm gửi lệnh thay đổi trạng thái LED (chỉ khi chế độ thủ công)
  const toggleLed = async () => {
    if (!isManual) return;
    const newState = ledState === "1" ? "0" : "1";
    try {
      const response = await fetch(
        `https://io.adafruit.com/api/v2/${ADAFRUIT_USERNAME}/feeds/${LED_FEED_KEY}/data`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-AIO-Key": ADAFRUIT_API_KEY,
          },
          body: JSON.stringify({ value: newState }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update LED state");
      }
      fetchAllData();
    } catch (err) {
      console.error("Error toggling LED:", err.message);
    }
  };

  // Hàm chuyển đổi giữa chế độ tự động và thủ công
  const toggleMode = () => {
    setIsManual(!isManual);
  };

  return (
    <div className={styles.controlContainer}>
      {/* Phần chuyển đổi chế độ */}
      <div className={styles.modeSwitch}>
        <span className={styles.modeLabel}>Chế độ: {isManual ? "Thủ công" : "Tự động"}</span>
        <button onClick={toggleMode} className={styles.modeButton}>
          Chuyển sang {isManual ? "Tự động" : "Thủ công"}
        </button>
      </div>
      
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <>
          <div className={styles.controlSection}>
            <div className={styles.controlItem}>
              <button
                onClick={togglePump}
                className={styles.controlButton}
                disabled={!isManual}  // Vô hiệu hóa nếu không ở chế độ thủ công
              >
                <img
                  src={pumpState === "1" ? FanAnimation : FanOff}
                  alt="Pump Control"
                  className={styles.controlImage}
                />
              </button>
              <div className={styles.label}>Máy bơm</div>
            </div>

            <div className={styles.controlItem}>
              <button
                onClick={toggleLed}
                className={styles.controlButton}
                disabled={!isManual}  // Vô hiệu hóa nếu không ở chế độ thủ công
              >
                <img
                  src={ledState === "1" ? LightOn : LightOff}
                  alt="LED Control"
                  className={styles.controlImage}
                />
              </button>
              <div className={styles.label}>Đèn</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Control;
