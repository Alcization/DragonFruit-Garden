import React, { useState } from "react";
import styles from "./register.module.css";
import LoginFarm from "../../assets/loginFarm.png";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorMsg = await response.text();
        setError(errorMsg);
      } else {
        const data = await response.json();
        setSuccess(data.message || "Đăng ký thành công!");
      }
    } catch (err) {
      setError("Đã có lỗi xảy ra. Vui lòng thử lại sau.");
      console.error("Error during registration:", err);
    }
  };

  return (
    <div className={styles.register_container}>
      {/* Form đăng ký */}
      <div className={styles.register_form}>
        <h2 className={styles.welcome1}>Tạo tài khoản mới</h2>
        <p className={styles.welcome2}>Bắt đầu hành trình quản lý nông trại.</p>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.label}>Tên</label>
          <input
            className={styles.input}
            type="text"
            name="name"
            placeholder="Nhập tên"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label className={styles.label}>Email</label>
          <input
            className={styles.input}
            type="email"
            name="email"
            placeholder="Nhập email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label className={styles.label}>Mật khẩu</label>
          <input
            className={styles.input}
            type="password"
            name="password"
            placeholder="Nhập mật khẩu"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button className={styles.register_btn} type="submit">
            Đăng ký
          </button>
        </form>

        {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
        {success && <p style={{ color: "green", marginTop: "10px" }}>{success}</p>}

        <div className={styles.separator}>Hoặc</div>

        <button className={styles.google_register}>
          <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google" />
          Đăng ký với Google
        </button>

        <p className={styles.login_link}>
          Đã có tài khoản? <a href="login">Đăng nhập</a>
        </p>

        <footer className={styles.footer}>© 2025 TẤT CẢ QUYỀN ĐƯỢC BẢO HỘ</footer>
      </div>

      {/* Ảnh bên phải */}
      <div className={styles.register_image}>
        <img src={LoginFarm} alt="Vertical Farming" />
      </div>
    </div>
  );
};

export default Register;
