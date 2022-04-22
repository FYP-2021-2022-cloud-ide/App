import type { AppProps } from "next/app";
import "../styles/globals.css";
import Layout from "../components/Layout";
import { CnailsProvider } from "../contexts/cnails";
import { ThemeProvider } from "../contexts/theme";
import { WarningProvider } from "../contexts/warning";
import { ContainerProvider } from "../contexts/containers";
import { MessagingProvider } from "../contexts/messaging";
import CustomToaster from "../components/CustomToaster";
import Head from "next/head";
import { CourseProvider } from "../contexts/courses";

interface CnailsProps extends AppProps {
  sub: string;
  name: string;
  email: string;
  userId: string;
  semesterId: string;
}

function CnailsApp({ Component, pageProps }: CnailsProps) {
  return (
    // all the context here are global contexts
    <>
      <Head>
        <title>Cnails</title>
      </Head>
      <CnailsProvider>
        <CourseProvider>
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
        </CourseProvider>
      </CnailsProvider>
    </>
  );
}

export default CnailsApp;
