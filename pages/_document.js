import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <link
                        href="https://rsms.me/inter/inter.css"
                        rel="stylesheet"
                    />

                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
window.$crisp=[];window.CRISP_WEBSITE_ID="f05b7e06-2d14-4eab-bf43-9fce79f0e42b";(function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();
          `,
                        }}
                    />
                </Head>
                <body>
                <Main />
                <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument