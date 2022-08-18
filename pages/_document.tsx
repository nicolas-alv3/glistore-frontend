import React from 'react'
import Document, {Html, Head, Main, NextScript} from 'next/document'
import loader from "../src/loader";

class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head/>
                <head>
                    <style>
                        {loader}
                    </style>
                </head>
                <body>
                <div id={'globalLoader'}>
                    <div className="loader">
                        <img src={"https://firebasestorage.googleapis.com/v0/b/pomelo-bebes.appspot.com/o/fijo%2FLogo_pomelo_largo_blanco.png?alt=media&token=6f040352-90a4-41ed-b3b0-d965d7084421"}/>
                        <div/>
                    </div>
                </div>
                <Main/>
                <NextScript/>
                </body>
            </Html>
        )
    }
}

export default MyDocument