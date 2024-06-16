import style from './main.module.css';
import {Left} from "@/app/(components)/leftside/left";

export const Main = () => {
    return (
        <>
        <main className={style.main}>
            <section id="introduction">
                <div className=".container">
                    <h2>Introduction</h2>
                    <p>Introductory text about the API and its purpose.</p>
                </div>
            </section>

            <section id="getting-started" className={style.section}>
                <div className={style.container}>
                    <h2>Getting Started</h2>
                    <p>Steps to get started with the API.</p>
                </div>
            </section>

            <section id="authentication">
                <div className="container">
                    <h2>Authentication</h2>
                    <p>Explanation of authentication methods.</p>
                </div>
            </section>

            <section id="endpoints">
                <div className="container">
                    <h2>Endpoints</h2>
                    <p>List of API endpoints and their functionalities.</p>
                </div>
            </section>

            <section id="examples">
                <div className="container">
                    <h2>Examples</h2>
                    <p>Code examples demonstrating API usage.</p>
                </div>
            </section>

            <section id="resources">
                <div className="container">
                    <h2>Resources</h2>
                    <p>Additional resources such as FAQs, support links, etc.</p>
                </div>
            </section>
        </main>
            </>
    )
}