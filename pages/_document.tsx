import React from 'react'
import Document, {Html, Head, Main, NextScript} from 'next/document'
import loader from "../src/loader";

class MyDocument extends Document {
    state = {
        url: ""
    }
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
                    <div className={"backdrop"}/>
                    <img alt={""} className={"background"} src={"https://firebasestorage.googleapis.com/v0/b/pomelo-bebes.appspot.com/o/logo%2FNicostore_logo?alt=media"}/>
                    <div className="loader">
                        <img alt={""} className={"logo"} src={"https://firebasestorage.googleapis.com/v0/b/pomelo-bebes.appspot.com/o/logo%2FNicostore_logo?alt=media"}/>
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