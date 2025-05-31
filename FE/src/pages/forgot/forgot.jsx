import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./forgot.module.css";

const Forgot = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Gửi OTP đến email
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      const response = await fetch("/api/password/forgot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (data.status === 200) {
        setMessage(data.message);
        setShowOtpModal(true);
      } else {
        setError(data.message || "Có lỗi xảy ra khi gửi OTP.");
      }
    } catch (err) {
      setError("Đã có lỗi xảy ra. Vui lòng thử lại sau.");
      console.error("Error sending OTP:", err);
    }
  };

  // Xác nhận OTP
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      const response = await fetch("/api/password/otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const data = await response.json();
      if (data.status === 200) {
        setMessage("OTP hợp lệ! Vui lòng nhập mật khẩu mới.");
        setOtpVerified(true);
      } else {
        setError(data.message || "Mã OTP không hợp lệ!");
      }
    } catch (err) {
      setError("Đã có lỗi xảy ra khi xác nhận OTP.");
      console.error("Error verifying OTP:", err);
    }
  };

  // Gửi lại OTP
  const handleResendOtp = async () => {
    setError("");
    setMessage("");
    try {
      const response = await fetch("/api/password/forgot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (data.status === 200) {
        setMessage("Mã OTP đã được gửi lại!");
      } else {
        setError(data.message || "Lỗi gửi lại OTP.");
      }
    } catch (err) {
      setError("Đã có lỗi xảy ra. Vui lòng thử lại sau.");
      console.error("Error resending OTP:", err);
    }
  };

  // Xác nhận đổi mật khẩu mới và chuyển hướng về trang login nếu thành công
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    if (newPassword !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp!");
      return;
    }
    try {
      const response = await fetch("/api/password/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: newPassword }),
      });
      const data = await response.json();
      if (data.status === 200) {
        setMessage("Đổi mật khẩu thành công!");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setError(data.message || "Lỗi khi đổi mật khẩu.");
      }
    } catch (err) {
      setError("Đã có lỗi xảy ra. Vui lòng thử lại sau.");
      console.error("Error resetting password:", err);
    }
  };

  // Hủy modal OTP
  const handleCancelOtp = () => {
    setShowOtpModal(false);
    setOtp("");
    setOtpVerified(false);
    setError("");
    setMessage("");
  };

  return (
    <div className={styles.forgot_container}>
      <div className={styles.forgot_form}>
        <h2>Quên mật khẩu</h2>
        <p>Nhập email của bạn để nhận mã OTP xác thực.</p>
        <form onSubmit={handleSendOtp}>
          <label>Email:</label>
          <input
            type="email"
            placeholder="Nhập email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className={styles.sendOtpButton}>
            Gửi OTP
          </button>
        </form>
        {error && <p className={styles.errorMessage}>{error}</p>}
        {message && <p className={styles.successMessage}>{message}</p>}
      </div>

      {/* Modal OTP */}
      {showOtpModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            {!otpVerified ? (
              <>
                <h3>Nhập mã OTP</h3>
                <input
                  type="text"
                  placeholder="Mã OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
                <div className={styles.modalButtons}>
                  <button
                    type="button"
                    className={styles.resendButton}
                    onClick={handleResendOtp}
                  >
                    Gửi lại mã
                  </button>
                  <button
                    type="button"
                    className={styles.confirmOtpButton}
                    onClick={handleOtpSubmit}
                  >
                    Xác nhận OTP
                  </button>
                  <button
                    type="button"
                    className={styles.cancelButton}
                    onClick={handleCancelOtp}
                  >
                    Hủy
                  </button>
                </div>
              </>
            ) : (
              <>
                <h3>Nhập mật khẩu mới</h3>
                <form onSubmit={handleResetPassword} className={styles.resetForm}>
                  <input
                    type="password"
                    placeholder="Mật khẩu mới"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                  <input
                    type="password"
                    placeholder="Xác nhận mật khẩu mới"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <button type="submit" className={styles.resetPasswordButton}>
                    Xác nhận đổi mật khẩu
                  </button>
                </form>
              </>
            )}
            {error && <p className={styles.errorMessage}>{error}</p>}
            {message && <p className={styles.successMessage}>{message}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default Forgot;
