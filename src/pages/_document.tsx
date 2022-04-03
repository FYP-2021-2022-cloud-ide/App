import Document, {
  DocumentContext,
  Html,
  Head,
  Main,
  NextScript,
} from "next/document";

class AppDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }

  render() {
    return <Html>
      <Head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />

        <meta name="msapplication-TileColor" content="#282c30" />
        <meta name="theme-color" content="#282c30" />
      </Head>
      <body>
        <Main></Main>
        <NextScript></NextScript>
      </body>
    </Html>
  }
}

export default AppDocument;
