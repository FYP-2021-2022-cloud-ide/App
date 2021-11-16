import { GetServerSideProps } from 'next';
import type { AppProps } from 'next/app'
import '../styles/globals.css'
import Layout from '../components/Layout'
import { CnailsProvider } from "../contexts/cnails";
import { ThemeProvider } from "../contexts/theme"

interface CnailsProps extends AppProps {
  sub: string
  name: string
  email: string
}

function CnailsApp({ Component, pageProps, sub, name, email }: CnailsProps) {
  console.log(sub)
  return (
    <ThemeProvider>
      <CnailsProvider>
        <Layout sub={sub} name={name} email={email}>
          <Component {...pageProps} />
        </Layout>
      </CnailsProvider>
    </ThemeProvider>

  )
}

CnailsApp.getInitialProps = async (ctx: any) => {
  var cookies = ctx.ctx.req.cookies
  return {
    sub: cookies.sub,
    name: cookies.name,
    email: cookies.email
  }
}

export default CnailsApp