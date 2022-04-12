
import type { AppProps } from 'next/app'
import '../styles/globals.css'
import Layout from '../components/Layout'
import { CnailsProvider } from "../contexts/cnails";
import { ThemeProvider } from "../contexts/theme"
import { WarningProvider } from '../contexts/warning';
import { ContainerProvider } from '../contexts/containers';
import { MessagingProvider } from '../contexts/messaging';
import CustomToaster from '../components/CustomToaster';

interface CnailsProps extends AppProps {
  sub: string
  name: string
  email: string
  userId: string
  semesterId: string
}

function CnailsApp({ Component, pageProps }: CnailsProps) {
  return (
    // all the context here are global contexts
    <CnailsProvider>
      <ThemeProvider>
        <MessagingProvider>
          <WarningProvider>
            <ContainerProvider>
              <Layout>
                <Component {...pageProps} />
                <CustomToaster />
              </Layout>
            </ContainerProvider>
          </WarningProvider>
        </MessagingProvider>
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

// for client-side performance test
// export function reportWebVitals(metric) {
//     console.log(metric) // The metric object ({ id, name, startTime, value, label }) is logged to the console
// }
export default CnailsApp