import { useState, useEffect, useRef } from "react";
import styles from "./profile.module.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  // Trạng thái cho form thông tin cá nhân
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  // Trạng thái cho đổi mật khẩu
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // Trạng thái hiển thị modal OTP
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState("");

  // Ref để trigger file input khi nhấn cập nhật ảnh đại diện
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetch("/userData.json")
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
        setName(data.name);
        setPhone(data.phone);
        setAddress(data.address);
      })
      .catch((error) => console.error("Lỗi khi tải dữ liệu:", error));
  }, []);

  const handleInfoSave = (e) => {
    e.preventDefault();
    // Xử lý lưu thông tin cá nhân (name, phone, address)
    alert("Thông tin cá nhân đã được lưu!");
  };

  // Khi nhấn nút "Xác nhận đổi mật khẩu"
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Mật khẩu xác nhận không khớp!");
      return;
    }
    // Gọi API gửi OTP (forgot)
    try {
      const response = await fetch("/api/password/forgot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email }),
      });
      const data = await response.json();
      if (data.status === 200) {
        alert(data.message);
        setShowOtpModal(true);
      } else {
        alert("Lỗi: " + data.message);
      }
    } catch (error) {
      console.error("Lỗi gửi OTP:", error);
    }
  };

  // Khi nhấn nút "Xác nhận mã" trong modal OTP
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      const otpResponse = await fetch("/api/password/otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email, otp }),
      });
      const otpData = await otpResponse.json();
      if (otpData.status === 200) {
        // Nếu OTP hợp lệ, gọi API đổi mật khẩu
        const resetResponse = await fetch("/api/password/reset", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password: newPassword }),
        });
        const resetData = await resetResponse.json();
        if (resetData.status === 200) {
          alert("Đổi mật khẩu thành công!");
          setShowOtpModal(false);
          setCurrentPassword("");
          setNewPassword("");
          setConfirmPassword("");
          setOtp("");
        } else {
          alert("Lỗi đổi mật khẩu: " + resetData.message);
        }
      } else {
        alert("Mã OTP không hợp lệ!");
      }
    } catch (error) {
      console.error("Lỗi xác nhận OTP:", error);
    }
  };

  // Gửi lại OTP
  const handleResendOtp = async () => {
    try {
      const response = await fetch("/api/password/forgot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email }),
      });
      const data = await response.json();
      if (data.status === 200) {
        alert("Mã OTP đã được gửi lại!");
      } else {
        alert("Lỗi: " + data.message);
      }
    } catch (error) {
      console.error("Lỗi gửi lại OTP:", error);
    }
  };

  const handleCancelOtp = () => {
    // Đóng modal và reset trạng thái OTP
    setShowOtpModal(false);
    setOtp("");
  };

  const handleAvatarClick = () => {
    // Trigger file input click
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Hiển thị preview ảnh đại diện
      const reader = new FileReader();
      reader.onload = (event) => {
        setUser({
          ...user,
          avatar: event.target.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  if (!user) {
    return <p>Đang tải dữ liệu...</p>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.leftColumn}>
        <div className={styles.profileInfo}>
          <img src={user.avatar} alt="Avatar" className={styles.avatar} />
          <h2>{user.name}</h2>
          <p>{user.role}</p>
          <button
            className={styles.updateAvatarButton}
            onClick={handleAvatarClick}
          >
            Cập nhật ảnh đại diện
          </button>
          {/* File input ẩn để upload ảnh */}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </div>
        <div className={styles.contactInfo}>
          <h3>Thông tin liên hệ</h3>
          <p>Email: {user.email}</p>
          <p>Số điện thoại: {user.phone}</p>
          <p>Địa chỉ: {user.address}</p>
        </div>
      </div>

      <div className={styles.rightColumn}>
        <div className={styles.personalInfo}>
          <h3>Thông tin cá nhân</h3>
          <form onSubmit={handleInfoSave}>
            <div className={styles.formGroup}>
              <label>Tên:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label>Số điện thoại:</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label>Địa chỉ:</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            <button type="submit" className={styles.saveButton}>
              Lưu thay đổi
            </button>
          </form>
        </div>

        <div className={styles.changePassword}>
          <h3>Đổi mật khẩu</h3>
          <form onSubmit={handlePasswordSubmit}>
            <div className={styles.formGroup}>
              <label>Mật khẩu hiện tại:</label>
              <input
                type="password"
                placeholder="Mật khẩu hiện tại"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label>Mật khẩu mới:</label>
              <input
                type="password"
                placeholder="Mật khẩu mới"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label>Xác nhận mật khẩu mới:</label>
              <input
                type="password"
                placeholder="Xác nhận mật khẩu mới"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className={styles.changePasswordButton}>
              Xác nhận đổi mật khẩu
            </button>
          </form>
        </div>
      </div>

      {/* Modal nhập OTP */}
      {showOtpModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
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
                Xác nhận mã
              </button>
              <button
                type="button"
                className={styles.cancelButton}
                onClick={handleCancelOtp}
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
