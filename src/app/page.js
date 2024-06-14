import {Header} from './(components)/header/header';
import {Footer} from "./(components)/footer";
import {Main} from "./(components)/main/main";
// import {V} from './service/create/page';

export default async function Home() {
  return (
      <>
        <Header />
          <Main />
        <Footer />
     </>
  );
}
