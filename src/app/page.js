import {Header} from './(components)/header/header';
import {Footer} from "./(components)/footer";
import {FlowEditor} from "./(components)/main/main";
import Head from 'next/head';

// import {V} from './service/create/page';

export default async function Home() {
  return (
      <>
          <Header/>
          <Footer/>
          <main style={{padding: '20px'}}>
              <h1>Flowchart Editor</h1>
              <FlowEditor/>
          </main>
      </>
  );
}
