import {Header} from './(components)/header/header';
import {Footer} from "./(components)/footer";
import {Main} from "./(components)/main/main";
import {Left} from "@/app/(components)/leftside/left"
import styles from './page.module.css'


export default async function Home() {
  return (
      <>
          <Header/>

          <div className={styles.container}>
              <Left/>
              <Main/>
          </div>
          <Footer/>
      </>
  );
}
