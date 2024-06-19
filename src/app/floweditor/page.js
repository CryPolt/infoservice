import {Header} from '../(components)/header/header';
import {Footer} from "../(components)/footer/footer";
 import {GoJSDiagram}  from './FlowEditor';


export default function FlowEditor() {
    return (
        <>
            <Header/>
            <main style={{ padding: '20px' }}>
        <h1>Flowchart Editor</h1>
        <GoJSDiagram />
      </main>
      {/* <Footer /> */}
    </>
    );
}
