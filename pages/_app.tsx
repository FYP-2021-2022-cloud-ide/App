import { GetServerSideProps } from 'next';
import type { AppProps } from 'next/app'
import '../styles/globals.css'
import Layout from '../components/Layout'
import { CnailsProvider } from "../contexts/cnails";

interface CnailsProps extends AppProps{
  sub: string
}

function CnailsApp({ Component, pageProps, sub}: CnailsProps) {
  //console.log(sub)
  return(
    <CnailsProvider>
      <Layout sub={sub}>
        <Component {...pageProps} />
      </Layout>
    </CnailsProvider>
    
  ) 
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  var cookies = context.req.cookies

  return {
      props:{
          sub: cookies.sub,
      }
  }
}

// CnailsApp.getInitialProps = async (ctx: any) => {
//   var cookies = ctx.ctx.req.cookies
//   return {
//     user: cookies.sub
//   }
// }

export default CnailsApp