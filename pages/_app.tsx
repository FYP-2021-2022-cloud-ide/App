import { GetServerSideProps } from 'next';
import { parse } from "cookie";
import type { AppProps } from 'next/app'
import '../styles/globals.css'
import Layout from '../components/Layout'
import { CnailsProvider } from "../contexts/cnails";
import { ThemeProvider } from "../contexts/theme"

interface CnailsProps extends AppProps {
  sub: string
  name: string
  email: string
  userId: string
  semesterId: string
}

function CnailsApp({ Component, pageProps }: CnailsProps) {
  return (
      <CnailsProvider>
        <ThemeProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </CnailsProvider>

  )
}

// CnailsApp.getInitialProps = async ({ctx}: any) => {
//   // console.log(ctx)
//   const{sub, name, email, userId, semesterId} = parse(ctx.req.headers.cookie)
//   return {
//     sub,
//     name,
//     email,
//     userId,
//     semesterId
//   }
// }

export default CnailsApp