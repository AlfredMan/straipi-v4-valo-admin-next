import "../../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/layout/Layout";
import { AuthProvider } from "../context/auth";
import ProtectRoute from "../components/ProtectRoute";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Head>
        <link rel="shortcut icon" href="/images/favicon.ico" />
      </Head>
      <Layout>
        <ProtectRoute>
          <Component {...pageProps} />
        </ProtectRoute>
      </Layout>
    </AuthProvider>
  );
}

export default MyApp;
