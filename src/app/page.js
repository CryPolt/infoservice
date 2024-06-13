import {Header} from './(components)/header/header';
import {Footer} from "./(components)/footer";
import {Main} from "./(components)/main/main";

export default async function Home() {
  return (
      <>
        <Header />
          <Main />
        <Footer />
      </>
  );
}
