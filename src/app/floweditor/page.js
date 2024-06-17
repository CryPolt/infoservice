import {Header} from '../(components)/header/header';
import {Footer} from "../(components)/footer/footer";
import {FlowEditor} from "./FlowEditor";


export default async function editor() {
    return (
        <>
            <Header/>
            <main style={{padding: '20px'}}>
                <h1>Flowchart Editor</h1>
                <FlowEditor/>
            </main>
            <Footer/>
        </>
    );
}
