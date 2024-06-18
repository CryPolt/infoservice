import styles from './main.module.css';
import {Cards} from "@/app/(components)/main/cards";

export const Main = () => {
    return (
            <div className={styles.mainSection}>
                <Cards />
            </div>

    )
}