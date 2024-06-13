import styles from './header.module.css'

export const Header = () => {

    return (
        <nav className={styles.navbar}>
            <a className={styles.navbarLogo} href="/">Navbar</a>
            <div className={styles.navbarCollapse}>
                <ul className={styles.navbarNav}>
                    <li className={styles.navItem}>
                        <a className={styles.navLink} href='/service'>
                            Service
                        </a>
                    </li>
                    <li className={styles.navItem}>
                        <a className={styles.navLink} href="#">
                            Database
                        </a>
                    </li>
                    <li className={styles.navItem}>
                        <a className={styles.navLink} href="#">
                             Team
                        </a>
                    </li>
                    <li className={styles.navItem}>
                        <a className={styles.navLink} href="#">
                            Documentation
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    )
};