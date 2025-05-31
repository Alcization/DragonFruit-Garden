import React from "react";
import { NavLink } from 'react-router-dom';
import styles from './introduce.module.css';
import IntroBg from '../../assets/introBg.png';
import IntroBg2 from '../../assets/introBg2.png';
import IntroIot from '../../assets/introIot.png';
import IntroRef from '../../assets/introRef.png';
import Footer from '../../assets/footer.png';

const Login = () => {
    window.location.href = '/login';
}

const Introduce = () => {
    return (
        <>
        <div className={styles.intro_container} style={{ backgroundImage: 'url(' + IntroBg + ')', 
            backgroundSize: 'cover', 
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center' }}>
            <div className={styles.content}>
                <h1 className={styles.text1}>GIẢI PHÁP THÔNG MINH CHO</h1>
                <h2 className={styles.text2}>KHU VƯỜN CỦA BẠN</h2>
                <p className={styles.text3}>
                    Nâng tầm nông nghiệp – Tối ưu năng suất – Tối đa lợi nhuận! <br />
                    Khu vườn thông minh, giải pháp bền vững cho nhà nông hiện đại.
                </p>
                <NavLink to={'/login'}>
                    <button className={styles.cta_button}>BẮT ĐẦU NGAY</button>
                </NavLink>
            </div>
            <nav className={styles.navbar}>
                <div className={styles.logo}>Smart Garden</div>
                <ul>
                    <li>VỀ CHÚNG TÔI</li>
                    <li>DỊCH VỤ</li>
                    <li onClick={Login}>ĐĂNG NHẬP</li>
                </ul>
            </nav>
        </div>
        <div className={styles.intro_container2} style={{ backgroundImage: 'url(' + IntroBg2 + ')', 
            backgroundSize: 'cover', 
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center' }}>
            <img src={IntroIot} alt="" />
            <img src={IntroRef} alt="" style={{paddingLeft: 20}}/>
        </div>
        <div className={styles.footer}>
            <img src={Footer} alt="" />  
        </div>              
    </>     
    );
}

export default Introduce;