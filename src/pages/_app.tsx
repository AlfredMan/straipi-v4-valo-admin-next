import "../../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/layout/Layout";
import { AuthProvider } from "../context/auth";
import ProtectRoute from "../components/ProtectRoute";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Layout>
        <ProtectRoute>
          <Component {...pageProps} />
        </ProtectRoute>
      </Layout>
    </AuthProvider>
  );
}

export default MyApp;
