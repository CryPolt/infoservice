import styles from './main.module.css';

export const Cards = () => {
    return (
        <>
            <div className={styles.card}>
                <div className={styles.statusGreen}></div>
                <div className={styles.cardContent}>
                    This is one of the card subjects
                </div>
                <div className={styles.author}><i className="fa fa-user-circle-o" aria-hidden="true"></i></div>
            </div>
            <div className={styles.card}>
                <div className={styles.statusBlue}></div>
                <div className={styles.cardContent}>
                    This is one of the card subjects 2
                </div>
                <div className={styles.author}><i className="fa fa-user-circle-o" aria-hidden="true"></i></div>
            </div>
            <div className={styles.card}>
                <div className={styles.statusRed}></div>
                <div className={styles.cardContent}>
                    This is one of the card subjects 3
                </div>
            </div>
        </>
    );
}