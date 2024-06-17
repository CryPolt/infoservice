import styles from './footer.module.css';

export const Footer = () => {
    return (
        <footer>
                <div id="line"></div>
                <h3 className={styles.footertext}>© Your Copyright 2023</h3>
                <h3 id="links"><a href="#">Imprint</a><span className={styles.footerspan}><a href="#">Privacy</a></span></h3>
        </footer>
    );
};
